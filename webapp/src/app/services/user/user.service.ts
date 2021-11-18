import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginResponse, Permission, SetCharacterName, UserWithPermissions } from '@nw-company-tool/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user$ = new ReplaySubject<UserWithPermissions>(1);
  private loggedIn$ = new ReplaySubject<boolean>(1);
  private loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  async login(): Promise<void> {
    await this.http
      .post<LoginResponse>('/api/login', {}, { withCredentials: true })
      .pipe(
        map((response) => {
          if (response.success) {
            this.loggedIn = true;
            this.loggedIn$.next(true);
            this.user$.next(response.user);
            if (response.user && !response.user.permissions.includes(Permission.ENABLED)) {
              this.router.navigate(['account-disabled']);
            }
          } else {
            if (response.newUser) {
              this.router.navigate(['register']);
            } else {
              this.router.navigate(['login']);
            }
          }
        })
      )
      .toPromise();
  }

  public getUser$(): Observable<UserWithPermissions> {
    return this.user$;
  }

  public isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public refreshUser(): void {
    this.http
      .get<UserWithPermissions>('/api/user', { withCredentials: true })
      .pipe(
        map((user) => {
          if (user) {
            this.user$.next(user);
          }
        })
      )
      .subscribe();
  }

  public logout(): void {
    this.http
      .post<void>('/api/login/logout', {}, { withCredentials: true })
      .pipe(
        map(() => {
          this.loggedIn = false;
          this.loggedIn$.next(false);
          this.user$.next(undefined);
          this.router.navigate(['login']);
        })
      )
      .subscribe();
  }

  public setCharacterName(name: string): Observable<unknown> {
    const payload: SetCharacterName = {
      characterName: name
    };
    return this.http.put('/api/user/charactername', payload, { withCredentials: true }).pipe(
      tap(() => {
        this.refreshUser();
      })
    );
  }
}
