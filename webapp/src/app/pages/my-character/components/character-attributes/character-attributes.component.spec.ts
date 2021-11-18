import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAttributesComponent } from './character-attributes.component';

describe('MyCharacterAttributesComponent', () => {
  let component: CharacterAttributesComponent;
  let fixture: ComponentFixture<CharacterAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterAttributesComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
