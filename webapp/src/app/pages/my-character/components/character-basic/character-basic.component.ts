import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { CharacterService } from '../../../../services/character/character.service';
import { UserService } from '../../../../services/user/user.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { Attribute, Character } from '@nw-company-tool/model';

@Component({
  selector: 'app-my-character-basic',
  templateUrl: './character-basic.component.html',
  styleUrls: ['./character-basic.component.css']
})
export class CharacterBasicComponent implements OnInit {
  @Input()
  character$!: Observable<Character>;

  name = new FormControl();
  level = new FormControl(0, [Validators.max(60), Validators.min(0)]);
  gearScore = new FormControl(0, [Validators.max(999), Validators.min(0)]);

  constructor(
    private characterService: CharacterService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.userService.getUser$().subscribe((user) => this.name.setValue(user.characterName));
    this.character$.subscribe((character) => {
      this.level.setValue(+character.LEVEL);
      this.gearScore.setValue(+character.GEAR_SCORE);
    });
  }

  save(): void {
    forkJoin([
      this.characterService.updateAttribute(Attribute.LEVEL, this.level.value.toString()),
      this.characterService.updateAttribute(Attribute.GEAR_SCORE, this.gearScore.value.toString()),
      this.userService.setCharacterName(this.name.value)
    ]).subscribe(() => this.snackbarService.open('Character saved'));
  }
}
