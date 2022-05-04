import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateHouseholdExpenseListComponent } from './validate-household-expense-list.component';

describe('ValidateHouseholdExpenseListComponent', () => {
  let component: ValidateHouseholdExpenseListComponent;
  let fixture: ComponentFixture<ValidateHouseholdExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateHouseholdExpenseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateHouseholdExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
