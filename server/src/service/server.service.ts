import * as process from 'process';
import { HttpError } from '../model/error.model';
import { UpdateService } from './update.service';
import { GithubService } from './github.service';
import { Version } from '../model/admin.model';
import { ArgsService, Flags } from './args.service';

export class ServerService {
  private static readonly INSTANCE = new ServerService();

  public static get(): ServerService {
    return ServerService.INSTANCE;
  }

  private updateService = UpdateService.get();
  private githubService = GithubService.get();
  private argsService = ArgsService.get();

  private constructor() {}

  public restart(): void {
    if (!process.send) {
      throw new HttpError(500, 'can not restart: this process seems to be no node child_process.');
    }
    setTimeout(() => {
      process.send?.('restart');
    }, 1000);
  }

  public async getLatestRelease(): Promise<Version> {
    const githubRelease = await this.githubService.getLatestRelease();
    return {
      version: githubRelease.name.substring(1) // strip the v from v1.0.0
    };
  }

  public async update(): Promise<void> {
    if (this.argsService.getFlag(Flags.DEVELOPMENT)) {
      console.log('server is running in development mode, skipping update.');
      return;
    }
    console.log('starting update...');
    const latestRelease = await this.githubService.getLatestRelease();
    const currentReleaseVersion = `v${this.updateService.readCurrentPackageVersion()}`; // package.json has release version without v
    if (latestRelease.name === currentReleaseVersion) {
      console.log('already up to date.');
      return;
    }
    console.log(`latest release is ${latestRelease.name}`);
    const releaseAsset = latestRelease.assets.filter((asset) => asset.label === 'node distribution')[0];
    if (!releaseAsset) {
      const errorMessage = 'can not update, latest release does not contain a node distribution asset.';
      console.error(errorMessage);
      throw new HttpError(500, errorMessage);
    }
    const release = await this.githubService.downloadAsset(releaseAsset.browser_download_url);
    console.log('download complete.');
    await this.updateService.update(release);
    console.log(`update to ${latestRelease.name} complete.`);
    this.restart();
  }

  public getCurrentRelease(): Version {
    return { version: this.updateService.readCurrentPackageVersion() };
  }
}
