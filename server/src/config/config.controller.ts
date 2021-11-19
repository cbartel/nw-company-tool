import { Controller, Get } from '@nestjs/common';
import { ConfigService } from './config.service';
import { Public } from '../login/login.decorator';
import { ClientConfig } from '@nw-company-tool/model';

@Controller('/api/config')
@Public()
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getConfig(): ClientConfig {
    return this.configService.getClientConfig();
  }
}
