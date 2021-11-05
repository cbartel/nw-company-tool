import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from './snackbar.service';

@NgModule({
  providers: [SnackbarService],
  imports: [HttpClientModule]
})
export class SnackbarModule {}
