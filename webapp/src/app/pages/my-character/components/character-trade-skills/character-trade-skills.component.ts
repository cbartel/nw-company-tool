import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, map, mergeMap } from 'rxjs/operators';
import { Attribute, Character } from '@nw-company-tool/model';
import { CharacterService } from '../../../../services/character/character.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-my-character-trade-skills',
  templateUrl: './character-trade-skills.component.html',
  styleUrls: ['./character-trade-skills.component.css']
})
export class CharacterTradeSkillsComponent implements OnInit {
  @Input()
  character$!: Observable<Character>;

  attributes = Attribute;

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

  constructor(private characterService: CharacterService, private snackbarService: SnackbarService) {}

  ngOnInit(): void {
    this.setupForm(this.weaponSmithing, Attribute.WEAPONSMITHING);
    this.setupForm(this.armoring, Attribute.ARMORING);
    this.setupForm(this.engineering, Attribute.ENGINEERING);
    this.setupForm(this.jewelcrafting, Attribute.JEWELCRAFTING);
    this.setupForm(this.arcana, Attribute.ARCANA);
    this.setupForm(this.cooking, Attribute.COOKING);
    this.setupForm(this.furnishing, Attribute.FURNISHING);
    this.setupForm(this.smelting, Attribute.SMELTING);
    this.setupForm(this.woodworking, Attribute.WOODWORKING);
    this.setupForm(this.leatherworking, Attribute.LEATHERWORKING);
    this.setupForm(this.weaving, Attribute.WEAVING);
    this.setupForm(this.stonecutting, Attribute.STONECUTTING);
    this.setupForm(this.logging, Attribute.LOGGING);
    this.setupForm(this.mining, Attribute.MINING);
    this.setupForm(this.fishing, Attribute.FISHING);
    this.setupForm(this.harvesting, Attribute.HARVESTING);
    this.setupForm(this.trackingAndSkinning, Attribute.TRACKING_AND_SKINNING);
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
