import { Router } from 'express';
import { ConfigService } from '../service/config.service';
import { ServerService } from '../service/server.service';

export const router = Router();

const configService = ConfigService.get();
const serverService = ServerService.get();

router.get('/', (req, res, next) => {
  try {
    const config = configService.getClientConfig();
    res.status(200).send(config);
  } catch (error) {
    next(error);
  }
});

router.get('/version', (req, res, next) => {
  try {
    const version = serverService.getCurrentRelease();
    res.status(200).send(version);
  } catch (error) {
    next(error);
  }
});
