import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  currentVersion: string;
  latestVersion: string;
  updateAvailable: boolean;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService
      .getCurrentReleaseVersion()
      .subscribe((currentVersion) => (this.currentVersion = currentVersion.version));
    this.adminService
      .getLatestReleaseVersion()
      .subscribe((latestVersion) => (this.latestVersion = latestVersion.version));
    this.adminService.isUpdateAvailable().subscribe((value) => (this.updateAvailable = value));
  }

  update(): void {
    this.adminService.update().subscribe(() => {
      window.location.reload();
    });
  }
}
