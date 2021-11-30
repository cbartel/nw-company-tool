import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ExpeditionController } from './expedition.controller';
import { ExpeditionService } from './expedition.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ExpeditionController],
  providers: [ExpeditionService],
  exports: [],
})
export class ExpeditionModule {}
