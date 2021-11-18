import { Module } from '@nestjs/common';
import { ArgsModule } from '../args/args.module';
import { PluginService } from './plugin.service';
import { PluginController } from './plugin.controller';

@Module({
  imports: [ArgsModule],
  controllers: [PluginController],
  providers: [PluginService],
  exports: [PluginService],
})
export class PluginModule {}
