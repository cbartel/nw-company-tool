import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { Permission } from '@nw-company-tool/model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export type NavigationItem = {
  label: string;
  routerLink: string;
  icon: string;
};

@Injectable({ providedIn: 'root' })
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
    },
    {
      label: 'EXPEDITION',
      routerLink: 'expedition',
      icon: 'landscape'
    }
  ];

  private adminNavigation: NavigationItem[] = [
    {
      label: 'ADMINISTRATION',
      routerLink: 'admin',
      icon: 'admin_panel_settings'
    }
  ];

  private pluginNavigation: NavigationItem[] = [];

  constructor(private userService: UserService /* private pluginService: PluginService*/) {
    // pluginService.getPlugins().subscribe(
    //   (plugins) =>
    //     (this.pluginNavigation = plugins.map((plugin) => ({
    //       label: plugin.navigationLabel,
    //       routerLink: plugin.navigationName + '/flights-search', // TODO temp
    //       icon: plugin.navigationIcon
    //     })))
    // );
  }

  isAdmin(): Observable<boolean> {
    return this.userService.getUser$().pipe(map((user) => !!user?.permissions?.includes(Permission.ADMIN)));
  }

  getNavigationItems(): Observable<NavigationItem[]> {
    const navigation = this.basicNavigation.concat(this.pluginNavigation);
    return this.isAdmin().pipe(
      map((admin) => {
        if (!admin) {
          return navigation;
        } else {
          return navigation.concat(this.adminNavigation);
        }
      })
    );
  }
}
