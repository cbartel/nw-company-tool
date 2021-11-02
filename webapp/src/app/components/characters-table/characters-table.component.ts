import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Attribute, Character, CharacterWithPartialAttributes } from '@model/character.model';
import { CharacterService } from '../../services/character/character.service';
import { FormControl } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CharacterDetailComponent, CharacterDetailDialogData } from '../character-detail/character-detail.component';

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.css']
})
export class CharactersTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['action', 'characterName', Attribute.LEVEL];
  filterableAttributes = [
    Attribute.LEVEL,
    Attribute.WEAPONSMITHING,
    Attribute.ARMORING,
    Attribute.ENGINEERING,
    Attribute.JEWELCRAFTING,
    Attribute.ARCANA,
    Attribute.COOKING
  ];
  selectedCraftSkill = new FormControl();

  displayedData = new MatTableDataSource<CharacterWithPartialAttributes>();
  data: CharacterWithPartialAttributes[] = [];

  attributes = Attribute;

  filter = new FormControl('');
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private characterService: CharacterService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.characterService
      .query({
        attributes: [Attribute.LEVEL]
      })
      .subscribe((data) => {
        this.data = data.sort((a, b) => this.compare(a.characterName, b.characterName, true));
        this.displayedData.data = data;
      });
    this.selectedCraftSkill.valueChanges.subscribe((craftSkill: string) => {
      this.characterService
        .query({
          attributes: [Attribute[craftSkill as keyof typeof Attribute]]
        })
        .subscribe((response) => {
          this.data = response.sort((a, b) => this.compare(a.characterName, b.characterName, true));
          this.displayedColumns = ['action', 'characterName'].concat([craftSkill]);
          this.applyFilter();
        });
    });
    this.filter.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngAfterViewInit() {
    this.displayedData.paginator = this.paginator;
  }

  applyFilter(): void {
    const filterValue = this.filter.value.toLowerCase();
    this.displayedData.data = this.data.filter((user) => user.characterName.toLowerCase().startsWith(filterValue));
  }

  getAllAttributes(): string[] {
    return Object.keys(Attribute);
  }

  sortData(sort: Sort): void {
    const data = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.data = data;
      this.applyFilter();
      return;
    }

    this.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return this.compare(
        a[sort.active as keyof CharacterWithPartialAttributes],
        b[sort.active as keyof CharacterWithPartialAttributes],
        isAsc
      );
    });
    this.applyFilter();
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openInDiscord(discordId: number): void {
    window.open(`discord://discordapp.com/users/${discordId}`);
  }

  showDetails(id: number, characterName: string) {
    this.dialog.open(CharacterDetailComponent, { data: { id, characterName } });
  }
}
