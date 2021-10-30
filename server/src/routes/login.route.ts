import { Router } from 'express';
import { TokenService } from '../service/token.service';
import { DiscordService } from '../service/discord.service';
import { UserService } from '../service/user.service';
import { CookieNames, Cookies } from '../model/request.model';
import { HttpError } from '../model/error.model';
import { LoginResponse, RegisterRequest } from '../model/login.model';

export const router = Router();

const tokenService = TokenService.get();
const discordService = DiscordService.get();
const userService = UserService.get();

router.post('/', (req, res, next) => {
  const cookies: Cookies = req.cookies;
  if (!cookies.access_token && !cookies.discord_token) {
    const response: LoginResponse = {
      success: false
    };
    res.status(200).send(response);
    return;
  }

  try {
    if (cookies.access_token) {
      const userId = tokenService.parseAccessToken(cookies.access_token!).id;
      const user = userService.getUserById(userId);
      if (user) {
        const response: LoginResponse = {
          success: true,
          user
        };
        res.status(200).send(response);
        return;
      } else {
        next(new HttpError(400, 'User not found'));
      }
    }
    if (cookies.discord_token) {
      const response: LoginResponse = {
        success: false,
        newUser: true
      };
      res.status(200).send(response);
      return;
    }
  } catch (error) {
    if (error instanceof HttpError && error.status === 401) {
      const response: LoginResponse = {
        success: false
      };
      res.status(200).send(response);
    } else {
      next(error);
    }
  }
});

router.get('/loginurl', (req, res, next) => {
  try {
    res.send({
      loginUrl: discordService.getLoginUrl()
    });
  } catch (error) {
    next(error);
  }
});

router.get('/callback', async ({ query }, res, next) => {
  try {
    const code = query.code as string;
    if (code) {
      const discordAccessToken = await discordService.getAccessToken(code).toPromise();
      const discordUser = await discordService.getUser(discordAccessToken).toPromise();
      const user = userService.getUserByDiscordId(discordUser.id);
      if (user) {
        // User has account
        const token = tokenService.createAccessToken(user.id, user.discordId);
        res.cookie(CookieNames.ACCESS_TOKEN, token, {
          httpOnly: true
        });
        res.redirect('/');
        return;
      } else {
        // Create new User
        res.cookie(CookieNames.DISCORD_TOKEN, discordAccessToken, {
          httpOnly: true
        });
        res.redirect('/');
        return;
      }
    }
  } catch (error) {
    next(error);
  }
});

router.post('/register', async (req, res, next) => {
  try {
    const cookies: Cookies = req.cookies;
    const payload: RegisterRequest = req.body;
    if (!cookies.discord_token) {
      next(new HttpError(401, 'missing discord token'));
      return;
    } else {
      const discordUser = await discordService.getUser(cookies.discord_token).toPromise();
      const user = userService.createUser({
        id: 0,
        discordUsername: discordUser.username,
        discordId: discordUser.id,
        characterName: payload.characterName,
        enabled: false,
        admin: false
      });
      res.clearCookie(CookieNames.DISCORD_TOKEN);
      res.cookie(CookieNames.ACCESS_TOKEN, tokenService.createAccessToken(user.id!, user.discordId), {
        httpOnly: true
      });
      res.status(200);
      res.send();
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res, next) => {
  try {
    res.clearCookie(CookieNames.ACCESS_TOKEN);
    res.clearCookie(CookieNames.DISCORD_TOKEN);
    res.status(200);
    res.send();
  } catch (error) {
    next(error);
  }
});
