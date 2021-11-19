import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCharacterComponent } from './my-character.component';

describe('MyCharacterComponent', () => {
  let component: MyCharacterComponent;
  let fixture: ComponentFixture<MyCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCharacterComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
