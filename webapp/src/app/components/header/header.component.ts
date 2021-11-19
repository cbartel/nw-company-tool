import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ConfigService } from '../../services/config/config.service';
import { map } from 'rxjs/operators';
import { NavigationItem, NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  username = '';
  isLoggedIn = false;

  private userSub!: Subscription;
  private loggedInSub!: Subscription;

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private navigationService: NavigationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userSub = this.userService.getUser$().subscribe((user) => {
      if (user) {
        this.username = `${user.discordUsername} (${user.characterName})`;
      } else {
        this.username = '';
      }
    });
    this.loggedInSub = this.userService.isLoggedIn$().subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn));
  }

  logout(): void {
    this.userService.logout();
  }

  home(): void {
    this.router.navigate(['/']);
  }

  headline(): Observable<string> {
    return this.configService.getConfig().pipe(map((config) => `${config.COMPANY.NAME} - ${config.COMPANY.SERVER}`));
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.loggedInSub.unsubscribe();
  }

  getNavigationItems(): Observable<NavigationItem[]> {
    return this.navigationService.getNavigationItems();
  }

  getAvatarUrl(): Observable<string> {
    return this.userService.getAvatar$().pipe(map((avatar) => avatar.url));
  }
}
