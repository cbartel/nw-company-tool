import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCharacterTradeSkillsComponent } from './my-character-trade-skills.component';

describe('MyCharacterTradeSkillsComponent', () => {
  let component: MyCharacterTradeSkillsComponent;
  let fixture: ComponentFixture<MyCharacterTradeSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCharacterTradeSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCharacterTradeSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
