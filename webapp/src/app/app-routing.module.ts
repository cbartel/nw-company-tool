import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home-page.module').then((m) => m.HomePageModule)
  },
  { path: 'login', loadChildren: () => import('./pages/login/login-page.module').then((m) => m.LoginPageModule) },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register-page.module').then((m) => m.RegisterPageModule)
  },
  {
    path: 'forbidden',
    loadChildren: () => import('./pages/forbidden/forbidden-page.module').then((m) => m.ForbiddenPageModule)
  },
  {
    path: 'account-disabled',
    loadChildren: () =>
      import('./pages/account-disabled/account-disabled-page.module').then((m) => m.AccountDisabledPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin-page.module').then((m) => m.AdminPageModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./pages/company/company-page.module').then((m) => m.CompanyPageModule)
  },
  {
    path: 'my-character',
    loadChildren: () => import('./pages/my-character/my-character-page.module').then((m) => m.MyCharacterPageModule)
  },
  {
    path: 'expedition',
    loadChildren: () => import('./pages/expedition/expedition-page.module').then((m) => m.ExpeditionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
