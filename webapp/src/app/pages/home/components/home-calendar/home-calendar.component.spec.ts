import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCalendarComponent } from './home-calendar.component';

describe('HomeCalendarComponent', () => {
  let component: HomeCalendarComponent;
  let fixture: ComponentFixture<HomeCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
