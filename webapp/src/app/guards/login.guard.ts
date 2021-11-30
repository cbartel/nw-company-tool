import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { Permission } from '@nw-company-tool/model';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.userService.isLoggedIn$().pipe(
      mergeMap((isLoggedIn) => {
        if (isLoggedIn) {
          return this.userService.getUser$();
        }
        return this.userService.login();
      }),
      map((user) => {
        if (!user) {
          return false;
        }
        if (!user.permissions.includes(Permission.ENABLED)) {
          this.router.navigate(['account-disabled']);
          return false;
        }
        return true;
      })
    );
  }
}
