import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  open(message: string, duration = 1500) {
    this.snackBar.open(message, 'OK', {
      duration,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-info']
    });
  }

  error(message: string, duration = 3000) {
    this.snackBar.open(message, 'OK', {
      duration,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error']
    });
  }
}
