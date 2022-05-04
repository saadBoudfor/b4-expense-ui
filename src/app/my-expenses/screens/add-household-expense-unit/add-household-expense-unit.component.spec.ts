import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseholdExpenseUnitComponent } from './add-household-expense-unit.component';

describe('AddHouseholdExpenseUnitComponent', () => {
  let component: AddHouseholdExpenseUnitComponent;
  let fixture: ComponentFixture<AddHouseholdExpenseUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHouseholdExpenseUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHouseholdExpenseUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
