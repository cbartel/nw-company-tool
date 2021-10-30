import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';

const tokenService = TokenService.get();
const userService = UserService.get();

export function accountEnabled(req: Request, res: Response, next: NextFunction): void {
  const accessToken = tokenService.parseAccessToken(req.cookies.access_token);
  if (!userService.isEnabled(accessToken.id)) {
    res.status(403).send('account is disabled');
    return;
  }
  next();
}

export function accountAdmin(req: Request, res: Response, next: NextFunction): void {
  const accessToken = tokenService.parseAccessToken(req.cookies.access_token);
  if (!userService.isAdmin(accessToken.id)) {
    res.status(403).send('account is not admin');
    return;
  }
  next();
}
