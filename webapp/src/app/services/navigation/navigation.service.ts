import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';

export type NavigationItem = {
  label: string;
  routerLink: string;
  icon: string;
};

@Injectable()
export class NavigationService {
  private basicNavigation: NavigationItem[] = [
    {
      label: 'MY CHARACTER',
      routerLink: 'my-character',
      icon: 'account_circle'
    },
    {
      label: 'COMPANY',
      routerLink: 'company',
      icon: 'group'
    }
  ];

  private adminNavigation: NavigationItem[] = [
    {
      label: 'ADMINISTRATION',
      routerLink: 'admin',
      icon: 'admin_panel_settings'
    }
  ];

  constructor(private userService: UserService) {}

  isAdmin(): boolean {
    return !!this.userService.getUser()?.admin;
  }

  public getNavigationItems(): NavigationItem[] {
    return this.isAdmin() ? this.basicNavigation.concat(this.adminNavigation) : this.basicNavigation;
  }
}