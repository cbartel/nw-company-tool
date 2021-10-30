import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CompanyService } from './company.service';

@NgModule({
  providers: [CompanyService],
  imports: [HttpClientModule]
})
export class CompanyModule {}
