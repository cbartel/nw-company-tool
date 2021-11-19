import { Body, Controller, Get, HttpException, Post, Query, Req, Res } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from './dto/user.create.dto';
import { DiscordService } from '../discord/discord.service';
import { CookieNames, Cookies } from '../app.model';
import { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';
import { TokenService } from '../token/token.service';
import { Public } from './login.decorator';
import { LoginResponse, LoginUrl } from '@nw-company-tool/model';

@Controller('/api/login')
@Public()
export class LoginController {
  constructor(
    private userService: UserService,
    private discordService: DiscordService,
    private tokenService: TokenService,
  ) {}

  @Post('/')
  async login(@Req() request: Request): Promise<LoginResponse> {
    const cookies: Cookies = request.cookies;
    if (!cookies.access_token && !cookies.discord_token) {
      return {
        success: false,
      };
    }
    if (cookies.access_token) {
      const userId = this.tokenService.parseAccessToken(cookies.access_token).id;
      const user = await this.userService.findUserWithPermissionsById(userId);
      if (user) {
        return {
          success: true,
          user,
        };
      } else {
        throw new HttpException('User not found', 401);
      }
    }
    if (cookies.discord_token) {
      return {
        success: false,
        newUser: true,
      };
    }
  }

  @Get('/loginurl')
  getLoginUrl(): LoginUrl {
    return {
      loginUrl: this.discordService.getLoginUrl(),
    };
  }

  @Get('/callback')
  async callback(@Query('code') code: string, @Res() response: Response) {
    if (code) {
      const discordAccessToken = await firstValueFrom(this.discordService.getAccessToken(code));
      const discordUser = await firstValueFrom(this.discordService.getUser(discordAccessToken));
      const user = await this.userService.findByDiscordId(discordUser.id);
      if (user) {
        // User has account
        const token = this.tokenService.createAccessToken(user.id, user.discordId, discordUser.avatar);
        response.cookie(CookieNames.ACCESS_TOKEN, token, { httpOnly: true });
        response.redirect('/');
        return;
      }
      // Create New User
      response.cookie(CookieNames.DISCORD_TOKEN, discordAccessToken, { httpOnly: true });
      response.redirect('/');
    }
  }

  @Post('/register')
  async register(@Body() user: CreateUserDto, @Req() request: Request, @Res() response: Response) {
    const cookies: Cookies = request.cookies;
    const discordUser = await firstValueFrom(this.discordService.getUser(cookies.discord_token!));
    const newUser = await this.userService.create({
      discordId: discordUser.id,
      discordUsername: discordUser.username,
      characterName: user.characterName,
    });
    response.clearCookie(CookieNames.DISCORD_TOKEN);
    const accessToken = this.tokenService.createAccessToken(newUser.id, discordUser.id, discordUser.avatar);
    response.cookie(CookieNames.ACCESS_TOKEN, accessToken, { httpOnly: true });
    response.status(200).send();
  }

  @Post('/logout')
  logout(@Res() response: Response): void {
    response.clearCookie(CookieNames.ACCESS_TOKEN);
    response.clearCookie(CookieNames.DISCORD_TOKEN);
    response.status(200).send();
  }
}
