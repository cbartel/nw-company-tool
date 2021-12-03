import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Event } from '@nw-company-tool/model';

@Injectable()
export class EventService {
  constructor(private eventEmitter: EventEmitter2) {}

  emit(event: Event): void {
    this.eventEmitter.emit(event.id, event);
  }
}
