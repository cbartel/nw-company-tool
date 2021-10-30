import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCharacterBasicComponent } from './my-character-basic.component';

describe('MyCharacterBasicComponent', () => {
  let component: MyCharacterBasicComponent;
  let fixture: ComponentFixture<MyCharacterBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCharacterBasicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCharacterBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
