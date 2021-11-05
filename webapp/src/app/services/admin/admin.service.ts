import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@model/user.model';

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
}
