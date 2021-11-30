import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { IS_LOGGED_IN_KEY, IS_PUBLIC_KEY, ROLES_KEY } from './login.decorator';
import { Reflector } from '@nestjs/core';
import { Cookies, Request } from '../app.model';
import { UserService } from '../user/user.service';
import { TokenService } from '../token/token.service';
import { Permission } from '@nw-company-tool/model';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService, private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const isLoggedIn = this.reflector.getAllAndOverride<boolean>(IS_LOGGED_IN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<Request>();
    const cookies: Cookies = request.cookies;
    const accessToken = this.tokenService.parseAccessToken(cookies.access_token);
    const user = await this.userService.findUserWithPermissionsById(accessToken.id);
    request.user = user; // TODO do this in middleware!!
    request.discordAvatar = accessToken.discordAvatar;

    if (isLoggedIn) {
      if (user) {
        return true;
      }
    }

    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return requiredPermissions.every((permission: Permission) => user.permissions.includes(permission));
  }
}
