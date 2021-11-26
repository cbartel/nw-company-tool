import { Injectable } from '@angular/core';
import { Expedition } from '@nw-company-tool/model';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService {
  private expeditions$ = new ReplaySubject<Expedition[]>(1);

  private expeditions: Expedition[] = [];

  constructor() {
    this.expeditions$.next(this.expeditions);
  }

  public getExpeditions(): Observable<Expedition[]> {
    return this.expeditions$;
  }

  public createExpedition(expedition: Expedition): void {
    this.expeditions.push(expedition);
    this.expeditions$.next(this.expeditions);
  }
}
