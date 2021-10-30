import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import {ClientConfig} from "@model/config.model";

@Injectable()
export class ConfigService {
  private config$ = new ReplaySubject<ClientConfig>(1);

  constructor(private http: HttpClient) {
    this.http.get<ClientConfig>('/api/config').subscribe((config) => this.config$.next(config));
  }

  public getConfig(): Observable<ClientConfig> {
    return this.config$;
  }
}
