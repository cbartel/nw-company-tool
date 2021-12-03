import { Injectable, NgZone } from '@angular/core';
import { UserService } from '../user/user.service';
import { Event, EventType } from '@nw-company-tool/model';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventSource: EventSource;
  private events$ = new Subject<Event>();

  constructor(private zone: NgZone, private userService: UserService) {}

  init(): void {
    this.userService.isLoggedIn$().subscribe((loggedIn) => {
      if (loggedIn) {
        this.eventSource = new EventSource('/api/event', { withCredentials: true });
        this.eventSource.onmessage = (event) => {
          this.zone.run(() => this.onEvent(JSON.parse(event.data)));
        };
      } else {
        this.eventSource?.close();
      }
    });
  }

  private onEvent(event: Event) {
    this.events$.next(event);
  }

  subscribe<T extends Event>(eventType: EventType<T>): Observable<T> {
    const eventId = new eventType().id;
    return this.events$.pipe(
      filter((event) => event.id === eventId),
      map((event) => event as T)
    );
  }
}
