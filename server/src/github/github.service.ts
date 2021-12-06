import { HttpException, Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom, map } from 'rxjs';
import { GithubRelease } from '@nw-company-tool/model';
import semver from 'semver';

@Injectable()
export class GithubService {
  constructor(private http: HttpService) {}

  public getLatestRelease(): Promise<GithubRelease> {
    return firstValueFrom(
      this.http.get<GithubRelease>('https://api.github.com/repos/cbartel/nw-company-tool/releases/latest').pipe(
        map((response) => response.data),
        catchError((error) => {
          if (error.response) {
            throw new HttpException(error.response.statusText, error.response.status);
          }
          throw new Error(error);
        }),
      ),
    );
  }

  public async getLatestBetaRelease(): Promise<GithubRelease> {
    const releases = await this.getReleases();
    return releases.reduce((previousValue, currentValue) =>
      semver.gt(previousValue.name.substring(1), currentValue.name.substring(1)) ? previousValue : currentValue,
    );
  }

  public getReleases(): Promise<GithubRelease[]> {
    return firstValueFrom(
      this.http.get<GithubRelease[]>('https://api.github.com/repos/cbartel/nw-company-tool/releases').pipe(
        map((response) => response.data),
        catchError((error) => {
          if (error.response) {
            throw new HttpException(error.response.statusText, error.response.status);
          }
          throw new Error(error);
        }),
      ),
    );
  }

  public downloadAsset(assetUrl: string): Promise<Readable> {
    return firstValueFrom(
      this.http
        .request<Readable>({
          url: assetUrl,
          method: 'GET',
          responseType: 'stream',
        })
        .pipe(
          map((response) => response.data),
          catchError((error) => {
            if (error.response) {
              throw new HttpException(error.response.statusText, error.response.status);
            }
            throw new Error(error);
          }),
        ),
    );
  }
}
