import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCharacterWeaponMasteryComponent } from './my-character-weapon-mastery.component';

describe('MyCharacterWeaponMasteryComponent', () => {
  let component: MyCharacterWeaponMasteryComponent;
  let fixture: ComponentFixture<MyCharacterWeaponMasteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCharacterWeaponMasteryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCharacterWeaponMasteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
