import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AdminUser, DeleteUser, EnableUser, UserWithPermissions, Version } from '@nw-company-tool/model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http: HttpClient) {}

  public findAll(): Observable<UserWithPermissions[]> {
    return this.http.get<UserWithPermissions[]>('/api/admin/users');
  }

  public setEnabled(id: number, enabled: boolean): Observable<unknown> {
    const payload: EnableUser = {
      userId: id,
      enabled
    };
    return this.http.post(`/api/admin/users/enable`, payload, { withCredentials: true });
  }

  public setAdmin(id: number, admin: boolean): Observable<unknown> {
    const payload: AdminUser = {
      userId: id,
      admin
    };
    return this.http.post(`/api/admin/users/admin`, payload, { withCredentials: true });
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
    return this.http.post('/api/admin/server/update', {}, { withCredentials: true });
  }

  public delete(id: number): Observable<unknown> {
    const payload: DeleteUser = { userId: id };
    return this.http.post('/api/admin/users/delete', payload, { withCredentials: true });
  }
}
