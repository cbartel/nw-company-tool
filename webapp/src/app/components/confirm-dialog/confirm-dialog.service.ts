import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';

export type ConfirmDialogData = {
  title: string;
  content: string;
  confirmLabel: string;
  abortLabel: string;
};

export type ConfirmDialogResult = {
  confirmed: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialog {
  constructor(private dialog: MatDialog) {}

  open(data: ConfirmDialogData): Observable<ConfirmDialogResult> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data });
    return dialogRef.afterClosed();
  }
}
