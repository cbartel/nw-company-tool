import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { AccountDisabledComponent } from './pages/account-disabled/account-disabled.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginGuard } from './guards/login.guard';
import { AdminGuard } from './guards/admin.guard';
import { CompanyComponent } from './pages/company/company.component';
import { MyCharacterComponent } from './pages/my-character/my-character.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'account-disabled', component: AccountDisabledComponent },
  { path: 'admin', component: AdminComponent, canActivate: [LoginGuard, AdminGuard] },
  { path: 'company', component: CompanyComponent, canActivate: [LoginGuard] },
  { path: 'my-character', component: MyCharacterComponent, canActivate: [LoginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
