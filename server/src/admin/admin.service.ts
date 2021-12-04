import { HttpException, Injectable, Logger } from '@nestjs/common';
import process from 'process';
import * as fs from 'fs-extra';
import { GithubService } from '../github/github.service';
import { ArgsService, Flags } from '../args/args.service';
import { Readable } from 'stream';
import zlib from 'zlib';
import tar from 'tar-stream';
import { GithubRelease, ServerRestartEvent, ServerUpdateEvent, Version } from '@nw-company-tool/model';
import { EventService } from '../event/event.service';

const logger = new Logger('NWCT Server');

@Injectable()
export class AdminService {
  private maintenance = false;

  constructor(
    private githubService: GithubService,
    private argsService: ArgsService,
    private eventService: EventService,
  ) {}

  public restart(): void {
    if (!process.send) {
      throw new HttpException('can not restart: this process seems to be no node child_process.', 500);
    }
    this.log('restarting server....');
    this.eventService.emit(new ServerRestartEvent());
    setTimeout(() => {
      process.send?.('restart');
    }, 1000);
  }

  public getCurrentReleaseVersion(): Version {
    const packageJson = fs.readJsonSync(`${process.cwd()}/package.json`);
    return { version: packageJson.version };
  }

  public async getLatestReleaseVersion(): Promise<Version> {
    if (this.argsService.getFlag(Flags.DEVELOPMENT)) {
      logger.log('test');
      return { version: 'DEVELOPMENT' };
    }
    const githubRelease = this.argsService.getFlag(Flags.BETA)
      ? await this.githubService.getLatestBetaRelease()
      : await this.githubService.getLatestRelease();
    return {
      version: githubRelease.name.substring(1), // strip the v from v1.0.0
    };
  }

  public async getLatestRelease(): Promise<GithubRelease> {
    return this.argsService.getFlag(Flags.BETA)
      ? await this.githubService.getLatestBetaRelease()
      : await this.githubService.getLatestRelease();
  }

  public isMaintenance(): boolean {
    return this.maintenance;
  }

  public async update(): Promise<void> {
    if (this.argsService.getFlag(Flags.DEVELOPMENT)) {
      this.log('server is running in development mode, skipping update.');
      this.restart();
      return;
    }
    this.log('starting update...');
    this.maintenance = true;
    const latestRelease = await this.getLatestRelease();
    const currentReleaseVersion = `v${this.getCurrentReleaseVersion().version}`; // package.json has release version without v
    if (latestRelease.name === currentReleaseVersion) {
      this.log('already up to date.');
      return;
    }
    this.log(`latest release is ${latestRelease.name}`);
    const releaseAsset = latestRelease.assets.filter((asset) => asset.label === 'node distribution')[0];
    if (!releaseAsset) {
      const errorMessage = 'can not update, latest release does not contain a node distribution asset.';
      logger.error(errorMessage);
      throw new HttpException(errorMessage, 500);
    }
    const release = await this.githubService.downloadAsset(releaseAsset.browser_download_url);
    this.log('download complete.');
    await this.performUpdate(release);
    this.log(`update to ${latestRelease.name} complete.`);
    this.restart();
  }

  private async performUpdate(updateData: Readable): Promise<void> {
    return new Promise((resolve) => {
      const extract = tar.extract();
      extract.on('entry', (header, stream, next) => {
        const data = [];

        stream.on('data', (chunk) => {
          if (header.type === 'file') {
            data.push(chunk);
          }
        });

        stream.on('end', () => {
          if (header.type === 'file') {
            const filePath = `${process.cwd()}/${header.name}`;
            fs.outputFileSync(filePath, Buffer.concat(data));
            this.log(`updated: ${header.name}`);
          }
          next();
        });
        stream.resume();
      });

      extract.on('finish', () => {
        this.log('updating files complete.');
        resolve();
      });

      updateData.pipe(zlib.createGunzip()).pipe(extract);
    });
  }

  private log(message: string): void {
    logger.log(message);
    this.eventService.emit(new ServerUpdateEvent(message));
  }
}
