import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin/admin.service';
import { EventService } from '../../../../services/event/event.service';
import { Subscription } from 'rxjs';
import { ServerRestartEvent, ServerUpdateEvent } from '@nw-company-tool/model';
import { FormControl } from '@angular/forms';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit, OnDestroy {
  currentVersion: string;
  latestVersion: string;
  updateAvailable: boolean;

  private serverUpdateSubscription: Subscription;
  private serverRestartSubscription: Subscription;
  logForm = new FormControl('');

  constructor(
    private adminService: AdminService,
    private eventService: EventService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.adminService
      .getCurrentReleaseVersion()
      .subscribe((currentVersion) => (this.currentVersion = currentVersion.version));
    this.adminService
      .getLatestReleaseVersion()
      .subscribe((latestVersion) => (this.latestVersion = latestVersion.version));
    this.adminService.isUpdateAvailable().subscribe((value) => (this.updateAvailable = value));
    this.serverUpdateSubscription = this.eventService.subscribe(ServerUpdateEvent).subscribe((event) => {
      this.logForm.setValue(`${this.logForm.value}\n${event.message}`);
    });
    this.serverRestartSubscription = this.eventService.subscribe(ServerRestartEvent).subscribe(() => {
      this.snackbarService.open('server is restarting.. please stand by', 0);
      setTimeout(() => window.location.reload(), 15000);
    });
  }

  update(): void {
    this.adminService.update().subscribe();
  }

  ngOnDestroy(): void {
    this.serverUpdateSubscription.unsubscribe();
    this.serverRestartSubscription.unsubscribe();
  }
}
