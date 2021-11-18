import { catchError, map, Observable } from 'rxjs';
import { URLSearchParams } from 'url';
import { ConfigService } from '../config/config.service';
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { TokenResponse, UserResponse } from '@nw-company-tool/model';

@Injectable()
export class DiscordService {
  private readonly CLIENT_ID: string;
  private readonly CLIENT_SECRET: string;
  private readonly REDIRECT_URL: string;

  constructor(private configService: ConfigService, private http: HttpService) {
    const serverConfig = configService.getServerConfig();
    this.CLIENT_ID = serverConfig.DISCORD.CLIENT_ID;
    this.CLIENT_SECRET = serverConfig.DISCORD.CLIENT_SECRET;
    this.REDIRECT_URL = `${serverConfig.BASE_URL}/api/login/callback`;
  }

  public getLoginUrl(): string {
    return `https://discord.com/api/oauth2/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${encodeURIComponent(
      this.REDIRECT_URL,
    )}&response_type=code&scope=identify`;
  }

  public getAccessToken(code: string): Observable<string> {
    const params = new URLSearchParams();
    params.append('client_id', this.CLIENT_ID);
    params.append('client_secret', this.CLIENT_SECRET);
    params.append('code', code as string);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', this.REDIRECT_URL);
    params.append('scope', 'identify');

    return this.http
      .post<TokenResponse>('https://discordapp.com/api/oauth2/token', params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        map((response) => response.data.access_token),
        catchError((error) => {
          if (error.response) {
            throw new HttpException(error.response.statusText, error.response.status);
          }
          throw new Error(error);
        }),
      );
  }

  public getUser(accessToken: string): Observable<UserResponse> {
    return this.http
      .get<UserResponse>('https://discord.com/api/users/@me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          if (error.response) {
            throw new HttpException(error.response.statusText, error.response.status);
          }
          throw new Error(error);
        }),
      );
  }
}
