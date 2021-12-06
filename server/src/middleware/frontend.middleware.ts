import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { join, resolve } from 'path';
import { Args, ArgsService } from '../args/args.service';

const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.json'];

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  private readonly dataPath: string;

  constructor(argsService: ArgsService) {
    this.dataPath = argsService.getArgument(Args.DATAPATH);
  }

  use(req: Request, res: Response, next: () => void): void {
    const { url } = req;
    if (url.indexOf('api') === 1) {
      next();
      return;
    }
    if (url.indexOf('plugins') === 1) {
      res.sendFile(join(resolve(this.dataPath), url));
      return;
    }
    if (allowedExt.filter((ext) => url.indexOf(ext) > 0).length > 0) {
      res.sendFile(join(process.cwd(), 'dist', 'app', url));
      return;
    }
    res.sendFile(join(process.cwd(), 'dist', 'app', 'index.html'));
  }
}
