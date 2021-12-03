import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [],
  providers: [EventService],
  controllers: [EventController],
  exports: [EventService],
})
export class EventModule {}
