import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import {
  Attribute,
  ATTRIBUTES,
  BASE,
  Character,
  GATHERING_SKILLS,
  REFINING_SKILLS,
  TRADE_SKILLS,
  WEAPON_SKILLS_MAGIC,
  WEAPON_SKILLS_ONE_HANDED,
  WEAPON_SKILLS_RANGED,
  WEAPON_SKILLS_TWO_HANDED
} from '@nw-company-tool/model';
import { CharacterService } from '../../../../services/character/character.service';
import { CharacterDetailComponent } from '../../../../components/character-detail/character-detail.component';

export type FilterModel = {
  attributes: Attribute[];
  label: string;
  checked?: boolean;
};

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.css']
})
export class CharactersTableComponent implements OnInit, AfterViewInit {
  displayedColumns = ['action', 'characterName', ...BASE, ...ATTRIBUTES];

  filterableAttributeGroups: FilterModel[] = [
    { attributes: BASE.concat(ATTRIBUTES), label: 'ATTRIBUTES_GROUP.ATTRIBUTES', checked: true },
    { attributes: BASE.concat(WEAPON_SKILLS_ONE_HANDED), label: 'ATTRIBUTES_GROUP.WEAPON_SKILLS_ONE_HANDED' },
    { attributes: BASE.concat(WEAPON_SKILLS_TWO_HANDED), label: 'ATTRIBUTES_GROUP.WEAPON_SKILLS_TWO_HANDED' },
    { attributes: BASE.concat(WEAPON_SKILLS_RANGED), label: 'ATTRIBUTES_GROUP.WEAPON_SKILLS_RANGED' },
    { attributes: BASE.concat(WEAPON_SKILLS_MAGIC), label: 'ATTRIBUTES_GROUP.WEAPON_SKILLS_MAGIC' },
    { attributes: TRADE_SKILLS, label: 'ATTRIBUTES_GROUP.TRADE_SKILLS' },
    { attributes: REFINING_SKILLS, label: 'ATTRIBUTES_GROUP.REFINING_SKILLS' },
    { attributes: GATHERING_SKILLS, label: 'ATTRIBUTES_GROUP.GATHERING_SKILLS' }
  ];

  attributeGroupFilter = new FormControl();

  displayedData = new MatTableDataSource<Character>();
  data: Character[] = [];

  attributes = Attribute;

  filter = new FormControl('');
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private characterService: CharacterService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.characterService
      .query({
        attributes: BASE.concat(ATTRIBUTES)
      })
      .subscribe((data) => {
        this.data = data.sort((a, b) => this.compare(a.characterName, b.characterName, true));
        this.displayedData.data = data;
      });
    this.attributeGroupFilter.valueChanges.subscribe((attributesString: string) => {
      const attributes = attributesString.split(',') as Attribute[];
      this.characterService
        .query({
          attributes
        })
        .subscribe((response) => {
          this.data = response.sort((a, b) => this.compare(a.characterName, b.characterName, true));
          this.displayedColumns = ['action', 'characterName'].concat(attributes);
          this.applyFilter();
        });
    });
    this.filter.valueChanges.subscribe(() => {
      this.applyFilter();
    });
  }

  ngAfterViewInit(): void {
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
      return this.compare(a[sort.active as keyof Character], b[sort.active as keyof Character], isAsc);
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
