import { NgModule } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  providers: [SnackbarService],
  imports: [MatSnackBarModule],
  exports: []
})
export class SnackbarModule {}
