import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterTradeSkillsComponent } from './character-trade-skills.component';

describe('MyCharacterTradeSkillsComponent', () => {
  let component: CharacterTradeSkillsComponent;
  let fixture: ComponentFixture<CharacterTradeSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterTradeSkillsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterTradeSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
