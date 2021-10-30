import { Router } from 'express';
import { ConfigService } from '../service/config.service';

export const router = Router();

const configService = ConfigService.get();

router.get('/', (req, res, next) => {
  try {
    const config = configService.getClientConfig();
    res.status(200).send(config);
  } catch (error) {
    next(error);
  }
});
