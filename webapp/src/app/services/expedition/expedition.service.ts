import { Injectable } from '@angular/core';
import {
  CreateExpedition,
  DeleteExpedition,
  Expedition,
  JoinExpedition,
  LeaveExpedition
} from '@nw-company-tool/model';
import { Observable, ReplaySubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {
  private expeditions$ = new ReplaySubject<Expedition[]>(1);

  private expeditions: Expedition[] = [];

  constructor(private http: HttpClient) {
    this.refreshExpeditions();
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
    this.http.post('/api/expedition/delete', payload, { withCredentials: true }).subscribe(() => {
      this.expeditions = this.expeditions.filter((expedition) => expedition.id !== id);
      this.expeditions$.next(this.expeditions);
    });
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
}
