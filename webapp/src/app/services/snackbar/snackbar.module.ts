import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from './snackbar.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  providers: [SnackbarService],
  imports: [HttpClientModule, MatSnackBarModule],
  exports: [MatSnackBarModule]
})
export class SnackbarModule {}
