import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Attribute, Character } from '@nw-company-tool/model';
import { CharacterService } from '../../services/character/character.service';

export interface CharacterDetailDialogData {
  id: number;
  characterName: string;
}

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css']
})
export class CharacterDetailComponent implements OnInit {
  character: Character;

  attributes: Attribute[] = [
    Attribute.STRENGTH,
    Attribute.DEXTERITY,
    Attribute.INTELLIGENCE,
    Attribute.FOCUS,
    Attribute.CONSTITUTION
  ];

  weaponSkills: Attribute[] = [
    Attribute.SWORD_AND_SHIELD,
    Attribute.RAPIER,
    Attribute.HATCHET,
    Attribute.SPEAR,
    Attribute.GREATAXE,
    Attribute.WARHAMMER,
    Attribute.GREATSWORD,
    Attribute.BOW,
    Attribute.MUSKET,
    Attribute.BLUNDERBUSS,
    Attribute.FIRESTAFF,
    Attribute.LIFESTAFF,
    Attribute.ICE_GAUNTLET,
    Attribute.VOID_GAUNTLET
  ];

  tradeSkills: Attribute[] = [
    Attribute.WEAPONSMITHING,
    Attribute.ARMORING,
    Attribute.ENGINEERING,
    Attribute.JEWELCRAFTING,
    Attribute.ARCANA,
    Attribute.COOKING,
    Attribute.FURNISHING,
    Attribute.SMELTING,
    Attribute.WOODWORKING,
    Attribute.LEATHERWORKING,
    Attribute.WEAVING,
    Attribute.STONECUTTING,
    Attribute.LOGGING,
    Attribute.MINING,
    Attribute.FISHING,
    Attribute.HARVESTING,
    Attribute.TRACKING_AND_SKINNING
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: CharacterDetailDialogData,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.characterService.findById(this.dialogData.id).subscribe((character) => (this.character = character));
  }
}
