import { Injectable, NgZone } from '@angular/core';
import { UserService } from '../user/user.service';
import { Event, EventType, KeepAliveEvent } from '@nw-company-tool/model';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventSource: EventSource;
  private events$ = new Subject<Event>();
  private lastKeepAlive: number;
  private keepAliveSubscription: Subscription;
  private reconnectSubscription: Subscription;

  constructor(private zone: NgZone, private userService: UserService) {
    this.userService.isLoggedIn$().subscribe((loggedIn) => {
      if (loggedIn) {
        this.connect();
      } else {
        this.eventSource?.close();
      }
    });
    this.subscribe(KeepAliveEvent).subscribe(() => this.onKeepAliveEvent());
  }

  private connect() {
    this.eventSource = new EventSource('/api/event', { withCredentials: true });
    this.eventSource.onmessage = (event) => {
      this.zone.run(() => this.onEvent(JSON.parse(event.data)));
    };
    this.eventSource.onerror = () => {
      this.disconnect();
      this.reconnect();
    };
    this.eventSource.onopen = () => {
      this.lastKeepAlive = moment.now();
      console.info('connected to server');
      this.reconnectSubscription?.unsubscribe();
      this.reconnectSubscription = undefined;
      this.keepAliveSubscription = interval(1000).subscribe(() => this.checkKeepAlive());
    };
  }

  private disconnect() {
    this.keepAliveSubscription?.unsubscribe();
    this.eventSource?.close();
  }

  private reconnect() {
    if (this.reconnectSubscription) {
      // already trying to reconnect...
      return;
    }
    this.reconnectSubscription = interval(2000).subscribe(() => {
      console.log('reconnecting...');
      this.connect();
    });
  }

  private onEvent(event: Event): void {
    this.events$.next(event);
  }

  private onKeepAliveEvent(): void {
    this.lastKeepAlive = moment.now();
  }

  private checkKeepAlive() {
    if (moment.now() - this.lastKeepAlive > 20000) {
      console.error('connection seems dead, trying to reconnect...');
      this.disconnect();
      this.reconnect();
    }
  }

  subscribe<T extends Event>(eventType: EventType<T>): Observable<T> {
    const eventId = new eventType().id;
    return this.events$.pipe(
      filter((event) => event.id === eventId),
      map((event) => event as T)
    );
  }
}
