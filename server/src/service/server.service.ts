import * as process from 'process';
import { HttpError } from '../model/error.model';
import { UpdateService } from './update.service';

export class ServerService {
  private static readonly INSTANCE = new ServerService();

  public static get(): ServerService {
    return ServerService.INSTANCE;
  }

  private updateService = UpdateService.get();

  private constructor() {}

  public restart() {
    if (!process.send) {
      throw new HttpError(500, 'can not restart: this process seems to be no node child_process');
    }
    setTimeout(() => {
      process.send!('restart');
    }, 1000);
  }

  public update() {
    this.updateService.update();
  }
}
