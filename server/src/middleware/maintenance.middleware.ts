import { Injectable, NestMiddleware } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { Request, Response } from 'express';

@Injectable()
export class MaintenanceMiddleware implements NestMiddleware {
  constructor(private adminService: AdminService) {}

  use(req: Request, res: Response, next: () => void): any {
    if (this.adminService.isMaintenance()) {
      res.status(503).send({ message: 'server is under maintenance' });
      return;
    }
    next();
  }
}
