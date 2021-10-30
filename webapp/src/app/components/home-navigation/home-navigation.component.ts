import { Component } from '@angular/core';
import { NavigationItem, NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-home-navigation',
  templateUrl: './home-navigation.component.html',
  styleUrls: ['./home-navigation.component.css']
})
export class HomeNavigationComponent {
  constructor(private navigationService: NavigationService) {}

  getNavigationItems(): NavigationItem[] {
    return this.navigationService.getNavigationItems();
  }
}
