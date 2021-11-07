import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { ClientConfig } from '@model/config.model';
import { Version } from '@model/admin.model';

@Injectable()
export class ConfigService {
  private config$ = new ReplaySubject<ClientConfig>(1);
  private version$ = new ReplaySubject<Version>(1);

  constructor(private http: HttpClient) {
    this.http.get<ClientConfig>('/api/config').subscribe((config) => this.config$.next(config));
    this.http.get<Version>('/api/config/version').subscribe((version) => this.version$.next(version));
  }

  public getConfig(): Observable<ClientConfig> {
    return this.config$;
  }

  public getVersion(): Observable<Version> {
    return this.version$;
  }
}
