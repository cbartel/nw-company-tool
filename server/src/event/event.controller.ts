import { Controller, Sse } from '@nestjs/common';
import { interval, Observable, Subject } from 'rxjs';
import { RequiredPermissions } from '../login/login.decorator';
import { KeepAliveEvent, Permission } from '@nw-company-tool/model';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('/api/event')
@RequiredPermissions(Permission.ENABLED)
export class EventController {
  private event$ = new Subject<string>();

  constructor() {
    interval(15000).subscribe(() => this.event$.next(JSON.stringify(new KeepAliveEvent())));
  }

  @Sse('/')
  sse(): Observable<string> {
    return new Observable((observer) => {
      this.event$.subscribe((event) => observer.next(event));
    });
  }

  @OnEvent('**')
  onEvent(event: Event): void {
    this.event$.next(JSON.stringify(event));
  }
}
