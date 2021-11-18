import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService, private router: Router, private snackbarService: SnackbarService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 400) {
            this.snackbarService.error(`HTTP Request failed: ${err.error.error}`);
          }
          if (err.status === 401) {
            this.userService.logout();
          }
          if (err.status === 403) {
            this.router.navigate(['forbidden']);
          }
        }
        throw throwError(err);
      })
    );
  }
}
