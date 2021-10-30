import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';
import { UserService } from '../../services/user/user.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import {User} from "@model/user.model";

@Component({
  selector: 'app-admin-users-table',
  templateUrl: './admin-users-table.component.html',
  styleUrls: ['./admin-users-table.component.css']
})
export class AdminUsersTableComponent implements OnInit {
  displayedColumns: string[] = ['id', 'characterName', 'discordUsername', 'discordId', 'enabled', 'admin'];

  displayedData: User[] = [];
  data: User[] = [];

  constructor(private adminService: AdminService, private userService: UserService) {}

  ngOnInit(): void {
    this.adminService.findAll().subscribe((data) => {
      this.data = data;
      this.displayedData = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.displayedData = this.data.filter((user) => user.characterName.toLowerCase().startsWith(filterValue));
  }

  getUserId(): number {
    return this.userService.getUser()!.id;
  }

  enabled(change: MatSlideToggleChange, user: User): void {
    //dont disable yourself ;)
    if (this.userService.getUser()?.id === user.id) {
      return;
    }
    this.adminService.setEnabled(user.id, change.checked);
  }

  admin(change: MatSlideToggleChange, user: User): void {
    //dont disable yourself ;)
    if (this.userService.getUser()?.id === user.id) {
      return;
    }
    this.adminService.setAdmin(user.id, change.checked);
  }
}
