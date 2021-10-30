import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../../services/character/character.service';
import { ReplaySubject } from 'rxjs';
import {CharacterAttributes} from "@model/character.model";

@Component({
  selector: 'app-my-character',
  templateUrl: './my-character.component.html',
  styleUrls: ['./my-character.component.css']
})
export class MyCharacterComponent implements OnInit {
  character = new ReplaySubject<CharacterAttributes>(1);

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.characterService.getAllAttributes().subscribe((result) => {
      this.character.next(result);
    });
  }
}
