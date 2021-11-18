import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { Cookies, Request } from '../app.model';
import { UserService } from './user.service';
import { TokenService } from '../token/token.service';
import { SetCharacterNameDto } from './dto/charactername.set.dto';
import { Public, RequiredPermissions } from '../login/login.decorator';
import { Permission, UserWithPermissions } from '@nw-company-tool/model';

@Controller('/api/user')
@RequiredPermissions(Permission.ENABLED)
export class UserController {
  constructor(private userService: UserService, private tokenService: TokenService) {}

  @Public()
  @Get('/')
  async getUser(@Req() request: Request): Promise<UserWithPermissions> {
    const cookies: Cookies = request.cookies;
    const accessToken = this.tokenService.parseAccessToken(cookies.access_token);
    return this.userService.findUserWithPermissionsById(accessToken.id);
  }

  @Put('/charactername')
  async setCharacterName(@Req() request: Request, @Body() body: SetCharacterNameDto): Promise<void> {
    await this.userService.setCharacterName(request.user.id, body.characterName);
  }
}
