import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permission } from '@nw-company-tool/model';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(): Observable<boolean> {
    if (!this.userService.isLoggedIn()) {
      this.userService.login();
      return of(false);
    }
    return this.userService.getUser$().pipe(
      map((user) => {
        return user.permissions.includes(Permission.ENABLED);
      })
    );
  }
}
