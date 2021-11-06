import { Router } from 'express';
import { UserService } from '../service/user.service';
import { HttpError } from '../model/error.model';
import { checkBoolean, checkNumber } from '../validation/input.validation';
import { ServerService } from '../service/server.service';

export const router = Router();

const userService = UserService.get();
const serverService = ServerService.get();

router.get('/users', (req, res, next) => {
  try {
    const users = userService.getAllUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
});

router.post('/users/enable/:userid', (req, res, next) => {
  try {
    const id = Number(req.params.userid);
    const enabled = req.body.enabled;
    if (!checkNumber(id) || !checkBoolean(enabled)) {
      next(new HttpError(400, 'invalid input'));
      return;
    }
    userService.setEnabled(id, enabled);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.post('/users/admin/:userid', (req, res, next) => {
  try {
    const id = Number(req.params.userid);
    const admin = req.body.admin;
    if (!checkNumber(id) || !checkBoolean(admin)) {
      next(new HttpError(400, 'invalid input'));
      return;
    }
    userService.setAdmin(id, admin);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.post('/server/restart/', (req, res, next) => {
  try {
    serverService.restart();
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.post('/server/update/', async (req, res, next) => {
  try {
    await serverService.update();
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

router.get('/server/release/latest', async (req, res, next) => {
  try {
    const latestRelease = await serverService.getLatestRelease();
    res.status(200).send(latestRelease);
  } catch (error) {
    next(error);
  }
});

router.get('/server/release/current', async (req, res, next) => {
  try {
    const latestRelease = await serverService.getCurrentRelease();
    res.status(200).send(latestRelease);
  } catch (error) {
    next(error);
  }
});
