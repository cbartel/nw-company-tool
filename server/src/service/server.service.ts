import * as process from 'process';
import { HttpError } from '../model/error.model';
import { UpdateService } from './update.service';
import { GithubService } from './github.service';
import { Release } from '../model/github.model';
import { Version } from '../model/admin.model';

export class ServerService {
  private static readonly INSTANCE = new ServerService();

  public static get(): ServerService {
    return ServerService.INSTANCE;
  }

  private updateService = UpdateService.get();
  private githubService = GithubService.get();

  private constructor() {}

  public restart(): void {
    if (!process.send) {
      throw new HttpError(500, 'can not restart: this process seems to be no node child_process.');
    }
    setTimeout(() => {
      process.send!('restart');
    }, 1000);
  }

  public getLatestRelease(): Promise<Release> {
    return this.githubService.getLatestRelease();
  }

  public async update(): Promise<void> {
    console.log('starting update...');
    const latestRelease = await this.getLatestRelease();
    const currentReleaseVersion = `v${this.updateService.readCurrentPackageVersion()}`;
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
