import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayHouseholdExpenseListComponent } from './display-household-expense-list.component';

describe('DisplayHouseholdExpenseListComponent', () => {
  let component: DisplayHouseholdExpenseListComponent;
  let fixture: ComponentFixture<DisplayHouseholdExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayHouseholdExpenseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayHouseholdExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
