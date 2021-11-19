import { ConfigService } from '../config/config.service';
import { AccessToken } from '../app.model';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class TokenService {
  private readonly TOKEN_SECRET: string;

  constructor(private configService: ConfigService) {
    this.TOKEN_SECRET = configService.getServerConfig().TOKEN_SECRET;
  }

  public createAccessToken(userId: number, discordId: string, discordAvatar: string): string {
    const accessToken: AccessToken = { id: userId, discordId, discordAvatar };
    return jwt.sign(accessToken, this.TOKEN_SECRET);
  }

  public parseAccessToken(token: string): JwtPayload & AccessToken {
    try {
      return jwt.verify(token, this.TOKEN_SECRET) as AccessToken;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
