import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDisabledComponent } from './account-disabled.component';

describe('AccountDisabledComponent', () => {
  let component: AccountDisabledComponent;
  let fixture: ComponentFixture<AccountDisabledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountDisabledComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDisabledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
