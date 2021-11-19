import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeSkillComponent } from './trade-skill.component';

describe('TradeSkillComponent', () => {
  let component: TradeSkillComponent;
  let fixture: ComponentFixture<TradeSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TradeSkillComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
