import { Router } from 'express';
import { TokenService } from '../service/token.service';
import { CharacterService } from '../service/character.service';
import { Cookies } from '../model/request.model';
import { HttpError } from '../model/error.model';
import { Attribute } from '../model/character.model';

export const router = Router();

const tokenService = TokenService.get();
const characterService = CharacterService.get();

router.get('/attributes', (req, res, next) => {
  try {
    const cookies: Cookies = req.cookies;
    if (!cookies.access_token) {
      next(new HttpError(401, 'access token is missing'));
      return;
    }
    const accessToken = tokenService.parseAccessToken(cookies.access_token);
    const userDetails = characterService.getAllAttributes(accessToken.id);
    if (!userDetails) {
      res.status(404).send();
    }
    res.status(200).send(userDetails);
  } catch (error) {
    next(error);
  }
});

router.post('/attributes/:attribute', (req, res, next) => {
  try {
    const cookies: Cookies = req.cookies;
    const attribute = Attribute[req.params.attribute.toUpperCase() as keyof typeof Attribute];
    const attributeValue = req.body.value;
    if (!attribute) {
      next(new HttpError(400, 'invalid attribute'));
      return;
    }

    if (!cookies.access_token) {
      next(new HttpError(401, 'access token is missing'));
      return;
    }
    const accessToken = tokenService.parseAccessToken(cookies.access_token);
    characterService.updateAttribute(accessToken.id, attribute, attributeValue);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});
