import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Expedition } from '@nw-company-tool/model';
import { ExpeditionService } from '../../../../services/expedition/expedition.service';
import { MatDialog } from '@angular/material/dialog';
import { ExpeditionCreateComponent } from '../expedition-create/expedition-create.component';

@Component({
  selector: 'app-expedition-table',
  templateUrl: './expedition-table.component.html',
  styleUrls: ['./expedition-table.component.css']
})
export class ExpeditionTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['planned', 'name', 'owner', 'participants'];
  dataSource = new MatTableDataSource<Expedition>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private expeditionService: ExpeditionService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.expeditionService.getExpeditions().subscribe((data) => (this.dataSource.data = data));
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  createNew(): void {
    this.dialog.open(ExpeditionCreateComponent);
  }
}
