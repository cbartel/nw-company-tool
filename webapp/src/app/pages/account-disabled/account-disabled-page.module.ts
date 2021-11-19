import { NgModule } from '@angular/core';
import { AccountDisabledRoutingModule } from './account-disabled-routing.module';
import { AccountDisabledComponent } from './routes/root/account-disabled.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [AccountDisabledRoutingModule, MatCardModule, MatButtonModule],
  declarations: [AccountDisabledComponent],
  providers: [],
  exports: []
})
export class AccountDisabledPageModule {}
