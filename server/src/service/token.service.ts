import * as jwt from 'jsonwebtoken';
import { ConfigService } from './config.service';
import { JwtPayload } from 'jsonwebtoken';
import { HttpError } from '../model/error.model';
import { AccessToken } from '../model/request.model';

const serverConfig = ConfigService.get().getServerConfig();

const TOKEN_SECRET = serverConfig.TOKEN_SECRET;

export class TokenService {
  private static readonly INSTANCE = new TokenService();

  public static get(): TokenService {
    return TokenService.INSTANCE;
  }

  private constructor() {}

  public createAccessToken(userId: number, discordId: string): string {
    const accessToken: AccessToken = { id: userId, discordId };
    return jwt.sign(accessToken, TOKEN_SECRET);
  }

  public parseAccessToken(token: string): JwtPayload & AccessToken {
    try {
      return jwt.verify(token, TOKEN_SECRET) as AccessToken;
    } catch (error) {
      throw new HttpError(401, error.message);
    }
  }
}
