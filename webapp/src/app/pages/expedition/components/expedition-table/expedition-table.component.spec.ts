import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionTableComponent } from './expedition-table.component';

describe('ExpeditionTableComponent', () => {
  let component: ExpeditionTableComponent;
  let fixture: ComponentFixture<ExpeditionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpeditionTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpeditionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
