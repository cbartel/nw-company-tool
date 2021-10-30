import { Router } from 'express';
import { UserService } from '../service/user.service';

export const router = Router();

const userService = UserService.get();

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
    userService.setAdmin(id, admin);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});
