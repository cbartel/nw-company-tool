import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionJoinComponent } from './expedition-join.component';

describe('ExpeditionJoinComponent', () => {
  let component: ExpeditionJoinComponent;
  let fixture: ComponentFixture<ExpeditionJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpeditionJoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpeditionJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
