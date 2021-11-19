import { Component } from '@angular/core';
import { NavigationItem, NavigationService } from '../../../../services/navigation/navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.css']
})
export class HomeNavigationComponent {
  navigationItems: NavigationItem[];

  constructor(private navigationService: NavigationService) {}

  getNavigationItems(): Observable<NavigationItem[]> {
    return this.navigationService.getNavigationItems();
  }
}
