import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDeleteComponent } from './character-delete.component';

describe('CharacterDeleteComponent', () => {
  let component: CharacterDeleteComponent;
  let fixture: ComponentFixture<CharacterDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
