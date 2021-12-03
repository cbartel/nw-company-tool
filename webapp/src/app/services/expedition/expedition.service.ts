import { Injectable } from '@angular/core';
import {
  CreateExpedition,
  DeleteExpedition,
  Expedition,
  ExpeditionCreateEvent,
  ExpeditionDeleteEvent,
  ExpeditionJoinEvent,
  ExpeditionLeaveEvent,
  JoinExpedition,
  LeaveExpedition
} from '@nw-company-tool/model';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventService } from '../event/event.service';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {
  private expeditions$ = new ReplaySubject<Expedition[]>(1);

  private expeditions: Expedition[] = [];

  constructor(private http: HttpClient, private eventService: EventService) {
    this.eventService.subscribe(ExpeditionCreateEvent).subscribe((event) => this.onExpeditionCreate(event));
    this.eventService.subscribe(ExpeditionDeleteEvent).subscribe((event) => this.onExpeditionDelete(event));
    this.eventService.subscribe(ExpeditionJoinEvent).subscribe((event) => this.onExpeditionJoin(event));
    this.eventService.subscribe(ExpeditionLeaveEvent).subscribe((event) => this.onExpeditionLeave(event));
  }

  public getExpeditions(): Observable<Expedition[]> {
    return this.expeditions$;
  }

  public refreshExpeditions(): void {
    this.pullExpeditions().subscribe((result) => {
      this.expeditions = result;
      this.expeditions$.next(this.expeditions);
    });
  }

  private pullExpeditions(): Observable<Expedition[]> {
    return this.http.get<Expedition[]>('/api/expedition', { withCredentials: true });
  }

  public createExpedition(expedition: CreateExpedition): Observable<unknown> {
    return this.http.post('/api/expedition', expedition, { withCredentials: true });
  }

  public deleteExpedition(id: number): void {
    const payload: DeleteExpedition = {
      id
    };
    this.http.post('/api/expedition/delete', payload, { withCredentials: true }).subscribe();
  }

  public joinExpedition(joinExpedition: JoinExpedition): void {
    this.http.post('/api/expedition/join', joinExpedition, { withCredentials: true }).subscribe(() => {
      this.refreshExpeditions();
    });
  }

  public leaveExpedition(leaveExpedition: LeaveExpedition): void {
    this.http
      .post('/api/expedition/leave', leaveExpedition, { withCredentials: true })
      .subscribe(() => this.refreshExpeditions());
  }

  private onExpeditionCreate(event: ExpeditionCreateEvent): void {
    this.expeditions.push(event.expedition);
    this.expeditions$.next(this.expeditions);
  }

  private onExpeditionDelete(event: ExpeditionDeleteEvent): void {
    this.expeditions = this.expeditions.filter((expedition) => expedition.id !== event.expeditionId);
    this.expeditions$.next(this.expeditions);
  }

  private onExpeditionJoin(event: ExpeditionJoinEvent): void {
    this.updateExpedition(event.expedition);
  }

  private onExpeditionLeave(event: ExpeditionLeaveEvent): void {
    this.updateExpedition(event.expedition);
  }

  private updateExpedition(updatedExpedition: Expedition): void {
    const idx = this.expeditions.findIndex((expedition) => expedition.id === updatedExpedition.id);
    if (idx >= 0) {
      this.expeditions[idx] = updatedExpedition;
    }
    this.expeditions$.next(this.expeditions);
  }
}
