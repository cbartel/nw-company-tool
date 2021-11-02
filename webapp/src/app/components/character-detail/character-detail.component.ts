import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CharacterService } from '../../services/character/character.service';
import { CharacterAttributes } from '@model/character.model';

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
  character: CharacterAttributes;

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
