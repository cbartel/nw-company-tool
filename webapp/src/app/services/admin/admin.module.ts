import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './admin.service';

@NgModule({
  providers: [AdminService],
  imports: [HttpClientModule]
})
export class AdminModule {}
