import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigController } from './config.controller';

@Module({
  imports: [],
  controllers: [ConfigController],
  providers: [{ provide: ConfigService, useValue: ConfigService.get() }],
  exports: [ConfigService],
})
export class ConfigModule {}
