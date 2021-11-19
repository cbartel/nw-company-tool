import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CharacterService } from '../../../../services/character/character.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { Attribute, Character } from '@nw-company-tool/model';

@Component({
  selector: 'app-my-character-attributes',
  templateUrl: './character-attributes.component.html',
  styleUrls: ['./character-attributes.component.css']
})
export class CharacterAttributesComponent implements OnInit {
  @Input()
  character$!: Observable<Character>;

  private readonly DEBOUNCE_TIME = 300;

  strengthForm = new FormControl(0, [Validators.max(999), Validators.min(0)]);
  dexterityForm = new FormControl(0, [Validators.max(999), Validators.min(0)]);
  intelligenceForm = new FormControl(0, [Validators.max(999), Validators.min(0)]);
  focusForm = new FormControl(0, [Validators.max(999), Validators.min(0)]);
  constitutionForm = new FormControl(0, [Validators.max(999), Validators.min(0)]);

  constructor(private characterService: CharacterService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.setupForm(this.strengthForm, Attribute.STRENGTH);
    this.setupForm(this.dexterityForm, Attribute.DEXTERITY);
    this.setupForm(this.intelligenceForm, Attribute.INTELLIGENCE);
    this.setupForm(this.focusForm, Attribute.FOCUS);
    this.setupForm(this.constitutionForm, Attribute.CONSTITUTION);
  }

  private setupForm(form: FormControl, attribute: Attribute) {
    const sub = this.character$.subscribe((character) => {
      form.setValue(+character[attribute] || 0);
      sub.unsubscribe();
      form.valueChanges
        .pipe(
          debounceTime(this.DEBOUNCE_TIME),
          mergeMap((value) => {
            if (form.valid && value !== null) {
              return this.characterService.updateAttribute(attribute, value.toString()).pipe(map(() => true));
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
