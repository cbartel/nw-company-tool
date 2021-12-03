import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ExpeditionController } from './expedition.controller';
import { ExpeditionService } from './expedition.service';
import { EventModule } from '../event/event.module';

@Module({
  imports: [DatabaseModule, EventModule],
  controllers: [ExpeditionController],
  providers: [ExpeditionService],
  exports: [],
})
export class ExpeditionModule {}
