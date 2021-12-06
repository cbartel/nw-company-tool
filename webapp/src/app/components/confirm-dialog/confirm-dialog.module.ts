import { NgModule } from '@angular/core';
import { ConfirmDialog } from './confirm-dialog.service';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [MatDialogModule, MatButtonModule],
  declarations: [ConfirmDialogComponent],
  providers: [ConfirmDialog],
  exports: []
})
export class ConfirmDialogModule {}
