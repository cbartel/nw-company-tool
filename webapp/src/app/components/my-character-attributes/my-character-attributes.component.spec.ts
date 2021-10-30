import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCharacterAttributesComponent } from './my-character-attributes.component';

describe('MyCharacterAttributesComponent', () => {
  let component: MyCharacterAttributesComponent;
  let fixture: ComponentFixture<MyCharacterAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCharacterAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCharacterAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
