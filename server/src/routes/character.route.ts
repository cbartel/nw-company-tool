import { Router } from 'express';
import { TokenService } from '../service/token.service';
import { CharacterService } from '../service/character.service';
import { Cookies } from '../model/request.model';
import { HttpError } from '../model/error.model';
import { Attribute } from '../model/character.model';

export const router = Router();

const tokenService = TokenService.get();
const characterService = CharacterService.get();

router.get('/all', (req, res, next) => {
  try {
    const result = characterService.getAllCharacters();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.post('/all', (req, res, next) => {
  try {
    const queryAttributes: string[] = req.body.attributes;
    if (queryAttributes && queryAttributes.length > 0) {
      const attributes = queryAttributes.map((attribute) => Attribute[attribute as keyof typeof Attribute]);
      const result = characterService.queryWithAttributes(attributes);
      res.status(200).send(result);
      return;
    }
    const result = characterService.getAllCharacters();
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/attributes/:userid', (req, res, next) => {
  try {
    const id = Number(req.params.userid);
    const userDetails = characterService.getAllAttributes(id);
    if (!userDetails) {
      res.status(404).send();
    }
    res.status(200).send(userDetails);
  } catch (error) {
    next(error);
  }
});

router.get('/attributes/me', (req, res, next) => {
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

router.post('/attributes/me/:attribute', (req, res, next) => {
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
