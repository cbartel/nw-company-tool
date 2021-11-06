import { Release } from '../model/github.model';
import axios from 'axios';
import { Readable } from 'stream';

export class GithubService {
  private static readonly INSTANCE = new GithubService();

  public static get(): GithubService {
    return GithubService.INSTANCE;
  }

  private constructor() {}

  public getLatestRelease(): Promise<Release> {
    return new Promise((resolve, reject) => {
      axios
        .get<Release>('https://api.github.com/repos/cbartel/nw-company-tool/releases/latest')
        .then((result) => {
          resolve(result.data);
        })
        .catch((error) => reject(error));
    });
  }

  public downloadAsset(assetUrl: string): Promise<Readable> {
    return new Promise((resolve, reject) => {
      axios
        .request<Readable>({
          url: assetUrl,
          method: 'GET',
          responseType: 'stream'
        })
        .then((result) => resolve(result.data))
        .catch((error) => reject(error));
    });
  }
}
