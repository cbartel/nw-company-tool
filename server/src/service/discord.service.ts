import { Observable } from 'rxjs';
import axios from 'axios';
import { TokenResponse, UserResponse } from '../model/discord.model';
import { ConfigService } from './config.service';

const serverConfig = ConfigService.get().getServerConfig();

const CLIENT_ID = serverConfig.DISCORD.CLIENT_ID;
const CLIENT_SECRET = serverConfig.DISCORD.CLIENT_SECRET;
const REDIRECT_URL = `${serverConfig.BASE_URL}/api/login/callback`;

export class DiscordService {
  private static readonly INSTANCE = new DiscordService();

  public static get(): DiscordService {
    return DiscordService.INSTANCE;
  }

  private constructor() {}

  public getLoginUrl(): string {
    return `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URL
    )}&response_type=code&scope=identify`;
  }

  public getAccessToken(code: string): Observable<string> {
    return new Observable<string>((observer) => {
      const params = new URLSearchParams();
      params.append('client_id', CLIENT_ID);
      params.append('client_secret', CLIENT_SECRET);
      params.append('code', code as string);
      params.append('grant_type', 'authorization_code');
      params.append('redirect_uri', REDIRECT_URL);
      params.append('scope', 'identify');

      axios
        .post<TokenResponse>('https://discordapp.com/api/oauth2/token', params, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then((response) => {
          observer.next(response.data.access_token);
          observer.complete();
        })
        .catch((error) => observer.error(error));
    });
  }

  public getUser(accessToken: string): Observable<UserResponse> {
    return new Observable<UserResponse>((observer) => {
      axios
        .get<UserResponse>('https://discord.com/api/users/@me', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then((response) => {
          observer.next(response.data);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
