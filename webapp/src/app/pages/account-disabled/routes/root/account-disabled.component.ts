import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { Subscription } from 'rxjs';
import { Permission } from '@nw-company-tool/model';

@Component({
  selector: 'app-account-disabled',
  templateUrl: './account-disabled.component.html',
  styleUrls: ['./account-disabled.component.css']
})
export class AccountDisabledComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService, private router: Router) {}

  private userSub!: Subscription;

  refresh(): void {
    this.userService.refreshUser();
  }

  ngOnInit(): void {
    this.userSub = this.userService.getUser$().subscribe((user) => {
      if (user?.permissions.includes(Permission.ENABLED)) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
