import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDisabledComponent } from './routes/root/account-disabled.component';

const routes: Routes = [
  {
    path: '',
    component: AccountDisabledComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDisabledRoutingModule {}
