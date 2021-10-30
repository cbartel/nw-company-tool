import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CharacterService } from './character.service';

@NgModule({
  providers: [CharacterService],
  imports: [HttpClientModule]
})
export class CharacterModule {}
