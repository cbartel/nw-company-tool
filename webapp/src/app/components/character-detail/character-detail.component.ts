import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CharacterService } from '../../services/character/character.service';
import { Attribute, CharacterAttributes } from '@model/character.model';

export interface CharacterDetailDialogData {
  id: number;
  characterName: string;
}

type AttributeModel = {
  attribute: Attribute;
  getValue: (character: CharacterAttributes) => number;
};

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: CharacterAttributes;

  attributes: AttributeModel[] = [
    { attribute: Attribute.STRENGTH, getValue: (character) => character.attributes.strength },
    { attribute: Attribute.DEXTERITY, getValue: (character) => character.attributes.dexterity },
    { attribute: Attribute.INTELLIGENCE, getValue: (character) => character.attributes.intelligence },
    { attribute: Attribute.FOCUS, getValue: (character) => character.attributes.focus },
    { attribute: Attribute.CONSTITUTION, getValue: (character) => character.attributes.constitution }
  ];

  weaponSkills: AttributeModel[] = [
    {
      attribute: Attribute.SWORD_AND_SHIELD,
      getValue: (character) => character.weaponMastery.oneHanded.swordAndShield
    },
    { attribute: Attribute.RAPIER, getValue: (character) => character.weaponMastery.oneHanded.rapier },
    { attribute: Attribute.HATCHET, getValue: (character) => character.weaponMastery.oneHanded.hatchet },
    { attribute: Attribute.SPEAR, getValue: (character) => character.weaponMastery.twoHanded.spear },
    { attribute: Attribute.GREATAXE, getValue: (character) => character.weaponMastery.twoHanded.greataxe },
    { attribute: Attribute.WARHAMMER, getValue: (character) => character.weaponMastery.twoHanded.warhammer },
    { attribute: Attribute.BOW, getValue: (character) => character.weaponMastery.ranged.bow },
    { attribute: Attribute.MUSKET, getValue: (character) => character.weaponMastery.ranged.musket },
    { attribute: Attribute.FIRESTAFF, getValue: (character) => character.weaponMastery.magic.firestaff },
    { attribute: Attribute.LIFESTAFF, getValue: (character) => character.weaponMastery.magic.lifestaff },
    { attribute: Attribute.ICE_GAUNTLET, getValue: (character) => character.weaponMastery.magic.iceGauntlet }
  ];

  tradeSkills: AttributeModel[] = [
    { attribute: Attribute.WEAPONSMITHING, getValue: (character) => character.tradeSkills.crafting.weaponSmithing },
    { attribute: Attribute.ARMORING, getValue: (character) => character.tradeSkills.crafting.armoring },
    { attribute: Attribute.ENGINEERING, getValue: (character) => character.tradeSkills.crafting.engineering },
    { attribute: Attribute.JEWELCRAFTING, getValue: (character) => character.tradeSkills.crafting.jewelcrafting },
    { attribute: Attribute.ARCANA, getValue: (character) => character.tradeSkills.crafting.arcana },
    { attribute: Attribute.COOKING, getValue: (character) => character.tradeSkills.crafting.cooking },
    { attribute: Attribute.FURNISHING, getValue: (character) => character.tradeSkills.crafting.furnishing },
    { attribute: Attribute.SMELTING, getValue: (character) => character.tradeSkills.refining.smelting },
    { attribute: Attribute.WOODWORKING, getValue: (character) => character.tradeSkills.refining.woodworking },
    { attribute: Attribute.LEATHERWORKING, getValue: (character) => character.tradeSkills.refining.leatherworking },
    { attribute: Attribute.WEAVING, getValue: (character) => character.tradeSkills.refining.weaving },
    { attribute: Attribute.STONECUTTING, getValue: (character) => character.tradeSkills.refining.stonecutting },
    { attribute: Attribute.LOGGING, getValue: (character) => character.tradeSkills.gathering.logging },
    { attribute: Attribute.MINING, getValue: (character) => character.tradeSkills.gathering.mining },
    { attribute: Attribute.FISHING, getValue: (character) => character.tradeSkills.gathering.fishing },
    { attribute: Attribute.HARVESTING, getValue: (character) => character.tradeSkills.gathering.harvesting },
    {
      attribute: Attribute.TRACKING_AND_SKINNING,
      getValue: (character) => character.tradeSkills.gathering.trackingAndSkinning
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<CharacterDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: CharacterDetailDialogData,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.characterService
      .getAllAttributesForUser(this.dialogData.id)
      .subscribe((character) => (this.character = character));
  }
}
