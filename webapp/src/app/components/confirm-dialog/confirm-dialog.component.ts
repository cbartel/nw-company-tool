import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogData, ConfirmDialogResult } from './confirm-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  abort() {
    const result: ConfirmDialogResult = {
      confirmed: false
    };
    this.dialogRef.close(result);
  }

  confirm() {
    const result: ConfirmDialogResult = {
      confirmed: true
    };
    this.dialogRef.close(result);
  }
}
