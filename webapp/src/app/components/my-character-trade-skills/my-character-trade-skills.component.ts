import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { CharacterService } from '../../services/character/character.service';
import {Attribute, CharacterAttributes} from "@model/character.model";

@Component({
  selector: 'app-my-character-trade-skills',
  templateUrl: './my-character-trade-skills.component.html',
  styleUrls: ['./my-character-trade-skills.component.css']
})
export class MyCharacterTradeSkillsComponent implements OnInit {
  @Input()
  character$!: Observable<CharacterAttributes>;

  private readonly DEBOUNCE_TIME = 300;

  weaponSmithing = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  armoring = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  engineering = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  jewelcrafting = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  arcana = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  cooking = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  furnishing = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  smelting = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  woodworking = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  leatherworking = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  weaving = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  stonecutting = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  logging = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  mining = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  fishing = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  harvesting = new FormControl(0, [Validators.max(200), Validators.min(0)]);
  trackingAndSkinning = new FormControl(0, [Validators.max(200), Validators.min(0)]);

  constructor(private characterService: CharacterService) {}

  ngOnInit(): void {
    this.setupForm(
      this.weaponSmithing,
      Attribute.WEAPONSMITHING,
      (character) => character.tradeSkills.crafting.weaponSmithing
    );
    this.setupForm(this.armoring, Attribute.ARMORING, (character) => character.tradeSkills.crafting.armoring);
    this.setupForm(this.engineering, Attribute.ENGINEERING, (character) => character.tradeSkills.crafting.engineering);
    this.setupForm(
      this.jewelcrafting,
      Attribute.JEWELCRAFTING,
      (character) => character.tradeSkills.crafting.jewelcrafting
    );
    this.setupForm(this.arcana, Attribute.ARCANA, (character) => character.tradeSkills.crafting.arcana);
    this.setupForm(this.cooking, Attribute.COOKING, (character) => character.tradeSkills.crafting.cooking);
    this.setupForm(this.furnishing, Attribute.FURNISHING, (character) => character.tradeSkills.crafting.furnishing);
    this.setupForm(this.smelting, Attribute.SMELTING, (character) => character.tradeSkills.refining.smelting);
    this.setupForm(this.woodworking, Attribute.WOODWORKING, (character) => character.tradeSkills.refining.woodworking);
    this.setupForm(
      this.leatherworking,
      Attribute.LEATERWORKING,
      (character) => character.tradeSkills.refining.leatherworking
    );
    this.setupForm(this.weaving, Attribute.WEAVING, (character) => character.tradeSkills.refining.weaving);
    this.setupForm(
      this.stonecutting,
      Attribute.STONECUTTING,
      (character) => character.tradeSkills.refining.stonecutting
    );
    this.setupForm(this.logging, Attribute.LOGGING, (character) => character.tradeSkills.gathering.logging);
    this.setupForm(this.mining, Attribute.MINING, (character) => character.tradeSkills.gathering.mining);
    this.setupForm(this.fishing, Attribute.FISHING, (character) => character.tradeSkills.gathering.fishing);
    this.setupForm(this.harvesting, Attribute.HARVESTING, (character) => character.tradeSkills.gathering.harvesting);
    this.setupForm(
      this.trackingAndSkinning,
      Attribute.TRACKING_AND_SKINNING,
      (character) => character.tradeSkills.gathering.trackingAndSkinning
    );
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
