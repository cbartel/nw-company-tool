import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CharacterService } from '../../services/character/character.service';
import { UserService } from '../../services/user/user.service';
import { forkJoin, Observable } from 'rxjs';
import { Attribute, CharacterAttributes } from '@model/character.model';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-my-character-basic',
  templateUrl: './my-character-basic.component.html',
  styleUrls: ['./my-character-basic.component.css']
})
export class MyCharacterBasicComponent implements OnInit {
  @Input()
  character$!: Observable<CharacterAttributes>;

  name = new FormControl();
  level = new FormControl(0, [Validators.max(60), Validators.min(0)]);

  constructor(
    private characterService: CharacterService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.userService.getUser$().subscribe((user) => this.name.setValue(user.characterName));
    this.character$.subscribe((character) => this.level.setValue(character.level));
  }

  save() {
    forkJoin([
      this.characterService.updateAttribute(Attribute.LEVEL, this.level.value),
      this.userService.setCharacterName(this.name.value)
    ]).subscribe(() => this.snackbarService.open('Character saved'));
  }
}
