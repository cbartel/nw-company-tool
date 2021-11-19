import { NgModule } from '@angular/core';
import { MyCharacterRoutingModule } from './my-character-routing.module';
import { MyCharacterComponent } from './routes/root/my-character.component';
import { CharacterAttributesComponent } from './components/character-attributes/character-attributes.component';
import { CharacterBasicComponent } from './components/character-basic/character-basic.component';
import { CharacterTradeSkillsComponent } from './components/character-trade-skills/character-trade-skills.component';
import { CharacterWeaponMasteryComponent } from './components/character-weapon-mastery/character-weapon-mastery.component';
import { TradeSkillComponent } from './components/trade-skill/trade-skill.component';
import { WeaponMasteryComponent } from './components/weapon-mastery/weapon-mastery.component';
import { AttributeComponent } from './components/attribute/attribute.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MyCharacterRoutingModule,
    TranslateModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule
  ],
  declarations: [
    MyCharacterComponent,
    CharacterAttributesComponent,
    CharacterBasicComponent,
    CharacterTradeSkillsComponent,
    CharacterWeaponMasteryComponent,
    TradeSkillComponent,
    WeaponMasteryComponent,
    AttributeComponent
  ],
  providers: [],
  exports: []
})
export class MyCharacterPageModule {}
