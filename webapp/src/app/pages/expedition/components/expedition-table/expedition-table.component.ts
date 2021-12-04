import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Expedition, Participant, Permission, Role } from '@nw-company-tool/model';
import { ExpeditionService } from '../../../../services/expedition/expedition.service';
import { MatDialog } from '@angular/material/dialog';
import { ExpeditionCreateComponent } from '../expedition-create/expedition-create.component';
import * as moment from 'moment';
import {
  CharacterDetailComponent,
  CharacterDetailDialogData
} from '../../../../components/character-detail/character-detail.component';
import { UserService } from '../../../../services/user/user.service';
import { Observable, of } from 'rxjs';
import { first, map, mergeMap } from 'rxjs/operators';
import { ExpeditionJoinComponent, ExpeditionJoinDialogData } from '../expedition-join/expedition-join.component';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { ConfirmDialog } from '../../../../components/confirm-dialog/confirm-dialog.service';
import { TranslateService } from '@ngx-translate/core';

export type Slot = {
  open: boolean;
  participant?: Participant;
  role: Role;
};

@Component({
  selector: 'app-expedition-table',
  templateUrl: './expedition-table.component.html',
  styleUrls: ['./expedition-table.component.css']
})
export class ExpeditionTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['planned', 'name', 'owner', 'tuning-orb', 'participants', 'delete'];
  dataSource = new MatTableDataSource<Expedition>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private expeditionService: ExpeditionService,
    private dialog: MatDialog,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private confirmDialog: ConfirmDialog,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.expeditionService.getExpeditions().subscribe((data) => {
      this.dataSource.data = data;
    });
    this.expeditionService.refreshExpeditions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  createNew(): void {
    this.dialog.open(ExpeditionCreateComponent);
  }

  formatDate(date: string): string {
    return moment.utc(date).local().format('YYYY-MM-DDTHH:mm:00');
  }

  formatDateLocal(date: string): string {
    return moment
      .utc(date)
      .local()
      .format(`${moment.localeData().longDateFormat('LL')} ${moment.localeData().longDateFormat('LT')}`);
  }

  countTuningOrbs(expedition: Expedition): number {
    return expedition.participants.reduce(
      (previousValue, currentValue) => previousValue + +currentValue.hasTuningOrb,
      0
    );
  }

  getSlot(participants: Participant[], role: Role, slot = 0): Slot {
    const result = participants.filter((participant) => participant.role === role)[slot];
    if (result) {
      return {
        open: false,
        participant: result,
        role
      };
    }
    return {
      open: true,
      role
    };
  }

  getTank(participants: Participant[]): Slot {
    return this.getSlot(participants, Role.TANK);
  }

  getHeal(participants: Participant[]): Slot {
    return this.getSlot(participants, Role.HEAL);
  }

  getDamage1(participants: Participant[]): Slot {
    return this.getSlot(participants, Role.DAMAGE, 0);
  }

  getDamage2(participants: Participant[]): Slot {
    return this.getSlot(participants, Role.DAMAGE, 1);
  }

  getDamage3(participants: Participant[]): Slot {
    return this.getSlot(participants, Role.DAMAGE, 2);
  }

  getIcon(role: Role): string {
    switch (role) {
      case Role.TANK:
        return 'shield';
      case Role.DAMAGE:
        return 'sports_martial_arts';
      case Role.HEAL:
        return 'healing';
      default:
        return 'question_mark';
    }
  }

  slotClick(slot: Slot, expedition: Expedition): void {
    this.userService
      .getUser$()
      .pipe(first())
      .subscribe((user) => {
        if (slot.participant) {
          if (slot.participant.userId === user.id) {
            this.expeditionService.leaveExpedition({ id: expedition.id });
            return;
          }
          this.showCharacterDetails(slot.participant);
          return;
        }

        if (slot.open && !expedition.participants.map((participant) => participant.userId).includes(user.id)) {
          const data: ExpeditionJoinDialogData = {
            slot,
            expedition
          };
          this.dialog.open(ExpeditionJoinComponent, { data });
          return;
        }

        const self = expedition.participants.filter((participant) => participant.userId === user.id)[0];
        if (slot.open && self) {
          this.snackbarService.open(`you are already part of this expedition as role ${self.role}!`);
        }
      });
  }

  showCharacterDetails(participant: Participant): void {
    const data: CharacterDetailDialogData = {
      id: participant.userId,
      characterName: participant.characterName
    };
    this.dialog.open(CharacterDetailComponent, { data });
  }

  getSlotColor(slot: Slot): Observable<string> {
    return this.userService.getUser$().pipe(
      map((user) => {
        if (slot.participant?.userId === user.id) return 'primary';
        if (!slot.open) return '';
        return 'accent';
      })
    );
  }

  getUserId(): Observable<number> {
    return this.userService.getUser$().pipe(map((user) => user.id));
  }

  delete(expedition: Expedition) {
    this.translateService
      .get(`EXPEDITION.${expedition.name}`)
      .pipe(
        mergeMap((name) => {
          return this.confirmDialog.open({
            title: 'Delete Expedition',
            content: `${name} - ${expedition.owner.characterName} - ${this.formatDateLocal(expedition.beginDateTime)}`,
            abortLabel: 'Abort',
            confirmLabel: 'Delete'
          });
        })
      )

      .subscribe((result) => {
        if (result.confirmed) {
          this.expeditionService.deleteExpedition(expedition.id);
        }
      });
  }

  isOwner(expedition: Expedition): Observable<boolean> {
    return this.userService.getUser$().pipe(
      map((user) => {
        if (user.permissions.includes(Permission.ADMIN)) {
          return true;
        }
        return expedition.owner.userId === user.id;
      })
    );
  }

  getSlotTooltip(slot: Slot): Observable<string> {
    if (slot.participant) {
      return this.userService.getUser$().pipe(
        map((user) => {
          if (slot.participant.userId === user.id) {
            return 'Leave Expedition';
          }
          return slot.participant.characterName;
        })
      );
    }
    return of(`Join as ${slot.role}`);
  }
}
