import { Router } from 'express';
import { CharacterService } from '../service/character.service';

export const router = Router();

const characterService = CharacterService.get();

router.get('/characters', (req, res, next) => {
  try {
    const users = characterService.getAllCharacters();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});
