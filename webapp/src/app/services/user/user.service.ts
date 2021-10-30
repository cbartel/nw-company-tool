import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import {LoginResponse} from "@model/login.model";
import {User} from "@model/user.model";

@Injectable()
export class UserService {
  private user: User | undefined = undefined;
  private user$ = new ReplaySubject<User | undefined>(1);
  private loggedIn$ = new ReplaySubject<boolean>(1);
  private loggedIn = false;

  constructor(private http: HttpClient, private router: Router) {}

  public login(): void {
    this.http
      .post<LoginResponse>('/api/login', {}, { withCredentials: true })
      .pipe(
        map((response) => {
          if (response.success) {
            this.loggedIn = true;
            this.loggedIn$.next(true);
            this.user = response.user;
            this.user$.next(this.user);
            if (this.user && !this.user.enabled) {
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
      .subscribe();
  }

  public getUser$(): Observable<User | undefined> {
    return this.user$;
  }

  public getUser(): User | undefined {
    return this.user;
  }

  public isLoggedIn$(): Observable<boolean> {
    return this.loggedIn$;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }

  public refreshUser(): void {
    this.http
      .get<User>('/api/user', { withCredentials: true })
      .pipe(
        map((user) => {
          if (user) {
            this.user = user;
            this.user$.next(this.user);
          }
        })
      )
      .subscribe();
  }

  public logout(): void {
    this.http
      .post<any>('/api/login/logout', {}, { withCredentials: true })
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
}
