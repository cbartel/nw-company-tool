import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CharacterService } from '../../services/character/character.service';
import { debounceTime, map, mergeMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Attribute, CharacterAttributes } from '@model/character.model';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-my-character-attributes',
  templateUrl: './my-character-attributes.component.html',
  styleUrls: ['./my-character-attributes.component.css']
})
export class MyCharacterAttributesComponent implements OnInit {
  @Input()
  character$!: Observable<CharacterAttributes>;

  private readonly DEBOUNCE_TIME = 300;

  strengthForm = new FormControl(0, [Validators.max(999), Validators.min(0)]);
  dexterityForm = new FormControl(0, [Validators.max(999), Validators.min(0)]);
  intelligenceForm = new FormControl(0, [Validators.max(999), Validators.min(0)]);
  focusForm = new FormControl(0, [Validators.max(999), Validators.min(0)]);
  constitutionForm = new FormControl(0, [Validators.max(999), Validators.min(0)]);

  constructor(private characterService: CharacterService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.setupForm(this.strengthForm, Attribute.STRENGTH, (character) => character.attributes.strength);
    this.setupForm(this.dexterityForm, Attribute.DEXTERITY, (character) => character.attributes.dexterity);
    this.setupForm(this.intelligenceForm, Attribute.INTELLIGENCE, (character) => character.attributes.intelligence);
    this.setupForm(this.focusForm, Attribute.FOCUS, (character) => character.attributes.focus);
    this.setupForm(this.constitutionForm, Attribute.CONSTITUTION, (character) => character.attributes.constitution);
  }

  private setupForm(
    form: FormControl,
    attribute: Attribute,
    attributeSelector: (character: CharacterAttributes) => number
  ) {
    const sub = this.character$.subscribe((character) => {
      form.setValue(attributeSelector(character));
      sub.unsubscribe();
      form.valueChanges
        .pipe(
          debounceTime(this.DEBOUNCE_TIME),
          mergeMap((value) => {
            if (form.valid && value !== null) {
              return this.characterService.updateAttribute(attribute, value).pipe(map(() => true));
            }
            return of(false);
          })
        )
        .subscribe((updated) => {
          if (updated) {
            this.snackbarService.open('Character saved');
          }
        });
    });
  }
}
