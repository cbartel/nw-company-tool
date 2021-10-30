import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company/company.service';
import {Character} from "@model/character.model";

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.css']
})
export class CharactersTableComponent implements OnInit {
  displayedColumns: string[] = ['characterName'];

  displayedData: Character[] = [];
  data: Character[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.findAll().subscribe((data) => {
      this.data = data;
      this.displayedData = data;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.displayedData = this.data.filter((user) => user.characterName.toLowerCase().startsWith(filterValue));
  }

  mouseOver(user: Character): void {
    console.log(user);
  }
}
