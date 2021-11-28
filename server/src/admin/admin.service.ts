import { HttpException, Injectable } from '@nestjs/common';
import process from 'process';
import * as fs from 'fs-extra';
import { GithubService } from '../github/github.service';
import { ArgsService, Flags } from '../args/args.service';
import { Readable } from 'stream';
import zlib from 'zlib';
import tar from 'tar-stream';
import { GithubRelease, Version } from '@nw-company-tool/model';

@Injectable()
export class AdminService {
  constructor(private githubService: GithubService, private argsService: ArgsService) {}

  public restart(): void {
    if (!process.send) {
      throw new HttpException('can not restart: this process seems to be no node child_process.', 500);
    }
    setTimeout(() => {
      process.send?.('restart');
    }, 1000);
  }

  public getCurrentReleaseVersion(): Version {
    const packageJson = fs.readJsonSync(`${process.cwd()}/package.json`);
    return { version: packageJson.version };
  }

  public async getLatestReleaseVersion(): Promise<Version> {
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

  public async update(): Promise<void> {
    if (this.argsService.getFlag(Flags.DEVELOPMENT)) {
      console.log('server is running in development mode, skipping update.');
      return;
    }
    console.log('starting update...');
    const latestRelease = await this.getLatestRelease();
    const currentReleaseVersion = `v${this.getCurrentReleaseVersion().version}`; // package.json has release version without v
    if (latestRelease.name === currentReleaseVersion) {
      console.log('already up to date.');
      return;
    }
    console.log(`latest release is ${latestRelease.name}`);
    const releaseAsset = latestRelease.assets.filter((asset) => asset.label === 'node distribution')[0];
    if (!releaseAsset) {
      const errorMessage = 'can not update, latest release does not contain a node distribution asset.';
      console.error(errorMessage);
      throw new HttpException(errorMessage, 500);
    }
    const release = await this.githubService.downloadAsset(releaseAsset.browser_download_url);
    console.log('download complete.');
    await this.performUpdate(release);
    console.log(`update to ${latestRelease.name} complete.`);
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
            console.log(`updated: ${header.name}`);
          }
          next();
        });
        stream.resume();
      });

      extract.on('finish', () => {
        console.log('updating files complete.');
        resolve();
      });

      updateData.pipe(zlib.createGunzip()).pipe(extract);
    });
  }
}
