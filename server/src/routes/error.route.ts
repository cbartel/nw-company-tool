import { Request, Response } from 'express';

import { HttpError } from '../model/error.model';
import { NextFunction } from 'express-serve-static-core';

export function invalidTokenErrorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  if (err instanceof HttpError) {
    res.status(err.status).send({ error: err.message });
  } else {
    next(err);
  }
}

export function errorHandler(err: Error, req: Request, res: Response): void {
  console.error(err);
  res.status(500).send({ message: err.message });
}
