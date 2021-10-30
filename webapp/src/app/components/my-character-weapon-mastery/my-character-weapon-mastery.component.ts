import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CharacterService } from '../../services/character/character.service';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import {Attribute, CharacterAttributes} from "@model/character.model";

@Component({
  selector: 'app-my-character-weapon-mastery',
  templateUrl: './my-character-weapon-mastery.component.html',
  styleUrls: ['./my-character-weapon-mastery.component.css']
})
export class MyCharacterWeaponMasteryComponent implements OnInit {
  @Input()
  character$!: Observable<CharacterAttributes>;

  private readonly DEBOUNCE_TIME = 300;

  swordAndShield = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  rapier = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  hatchet = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  spear = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  greataxe = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  warhammer = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  bow = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  musket = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  firestaff = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  lifestaff = new FormControl(0, [Validators.max(20), Validators.min(0)]);
  iceGauntlet = new FormControl(0, [Validators.max(20), Validators.min(0)]);

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.setupForm(
      this.swordAndShield,
      Attribute.SWORD_AND_SHIELD,
      (character) => character.weaponMastery.oneHanded.swordAndShield
    );
    this.setupForm(this.rapier, Attribute.RAPIER, (character) => character.weaponMastery.oneHanded.rapier);
    this.setupForm(this.hatchet, Attribute.HATCHET, (character) => character.weaponMastery.oneHanded.hatchet);
    this.setupForm(this.spear, Attribute.SPEAR, (character) => character.weaponMastery.twoHanded.spear);
    this.setupForm(this.greataxe, Attribute.GREATAXE, (character) => character.weaponMastery.twoHanded.greataxe);
    this.setupForm(this.warhammer, Attribute.WARHAMMER, (character) => character.weaponMastery.twoHanded.warhammer);
    this.setupForm(this.bow, Attribute.BOW, (character) => character.weaponMastery.ranged.bow);
    this.setupForm(this.musket, Attribute.MUSKET, (character) => character.weaponMastery.ranged.musket);
    this.setupForm(this.firestaff, Attribute.FIRESTAFF, (character) => character.weaponMastery.magic.firestaff);
    this.setupForm(this.lifestaff, Attribute.LIFESTAFF, (character) => character.weaponMastery.magic.firestaff);
    this.setupForm(this.iceGauntlet, Attribute.ICE_GAUNTLET, (character) => character.weaponMastery.magic.firestaff);
  }

  private setupForm(
    form: FormControl,
    attribute: Attribute,
    attributeSelector: (character: CharacterAttributes) => number
  ) {
    const sub = this.character$.subscribe((character) => {
      form.setValue(attributeSelector(character));
      sub.unsubscribe();
      form.valueChanges.pipe(debounceTime(this.DEBOUNCE_TIME)).subscribe((value) => {
        if (form.valid && value !== null) {
          this.characterService.updateAttribute(attribute, value);
        }
      });
    });

  }
}
