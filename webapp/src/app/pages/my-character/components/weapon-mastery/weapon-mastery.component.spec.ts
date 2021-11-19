import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponMasteryComponent } from './weapon-mastery.component';

describe('WeaponMasteryComponent', () => {
  let component: WeaponMasteryComponent;
  let fixture: ComponentFixture<WeaponMasteryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeaponMasteryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponMasteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
