import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@model/user.model';
import { Version } from '@model/admin.model';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {}

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/admin/users');
  }

  public setEnabled(id: number, enabled: boolean): Observable<unknown> {
    const payload = {
      enabled
    };
    return this.http.post(`/api/admin/users/enable/${id}`, payload, { withCredentials: true });
  }

  public setAdmin(id: number, admin: boolean): Observable<unknown> {
    const payload = {
      admin
    };
    return this.http.post(`/api/admin/users/admin/${id}`, payload, { withCredentials: true });
  }

  public getLatestReleaseVersion(): Observable<Version> {
    return this.http.get<Version>('/api/admin/server/release/latest', { withCredentials: true });
  }

  public getCurrentReleaseVersion(): Observable<Version> {
    return this.http.get<Version>('/api/admin/server/release/current', { withCredentials: true });
  }

  public isUpdateAvailable(): Observable<boolean> {
    return this.getCurrentReleaseVersion().pipe(
      mergeMap((currentVersion) =>
        this.getLatestReleaseVersion().pipe(map((latestVersion) => ({ currentVersion, latestVersion })))
      ),
      map(({ currentVersion, latestVersion }) => currentVersion.version !== latestVersion.version)
    );
  }

  public update(): Observable<unknown> {
    return this.http.post('api/admin/server/update', {}, { withCredentials: true });
  }
}
