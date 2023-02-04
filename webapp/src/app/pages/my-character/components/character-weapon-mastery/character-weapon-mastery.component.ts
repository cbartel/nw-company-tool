import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { Attribute, Character } from '@nw-company-tool/model';
import { CharacterService } from '../../../../services/character/character.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-my-character-weapon-mastery',
  templateUrl: './character-weapon-mastery.component.html',
  styleUrls: ['./character-weapon-mastery.component.css']
})
export class CharacterWeaponMasteryComponent implements OnInit {
  @Input()
  character$!: Observable<Character>;

  attributes = Attribute;

  private readonly DEBOUNCE_TIME = 300;

  swordAndShield = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  rapier = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  hatchet = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  spear = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  greataxe = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  warhammer = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  greatsword = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  bow = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  musket = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  blunderbuss = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  firestaff = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  lifestaff = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  iceGauntlet = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  voidGauntlet = new FormControl(0, [Validators.max(20), Validators.min(0)]);

  constructor(private characterService: CharacterService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.setupForm(this.swordAndShield, Attribute.SWORD_AND_SHIELD);
    this.setupForm(this.rapier, Attribute.RAPIER);
    this.setupForm(this.hatchet, Attribute.HATCHET);
    this.setupForm(this.spear, Attribute.SPEAR);
    this.setupForm(this.greataxe, Attribute.GREATAXE);
    this.setupForm(this.warhammer, Attribute.WARHAMMER);
    this.setupForm(this.greatsword, Attribute.GREATSWORD);
    this.setupForm(this.bow, Attribute.BOW);
    this.setupForm(this.musket, Attribute.MUSKET);
    this.setupForm(this.blunderbuss, Attribute.BLUNDERBUSS);
    this.setupForm(this.firestaff, Attribute.FIRESTAFF);
    this.setupForm(this.lifestaff, Attribute.LIFESTAFF);
    this.setupForm(this.iceGauntlet, Attribute.ICE_GAUNTLET);
    this.setupForm(this.voidGauntlet, Attribute.VOID_GAUNTLET);
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
