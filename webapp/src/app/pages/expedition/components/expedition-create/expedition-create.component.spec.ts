import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpeditionCreateComponent } from './expedition-create.component';

describe('ExpeditionCreateComponent', () => {
  let component: ExpeditionCreateComponent;
  let fixture: ComponentFixture<ExpeditionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpeditionCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpeditionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
