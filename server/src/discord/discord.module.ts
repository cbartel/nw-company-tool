import { Module } from '@nestjs/common';
import { DiscordService } from './discord.service';
import { ConfigModule } from '../config/config.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  controllers: [],
  providers: [DiscordService],
  exports: [DiscordService],
})
export class DiscordModule {}
