import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterWeaponMasteryComponent } from './character-weapon-mastery.component';

describe('MyCharacterWeaponMasteryComponent', () => {
  let component: CharacterWeaponMasteryComponent;
  let fixture: ComponentFixture<CharacterWeaponMasteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterWeaponMasteryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterWeaponMasteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
