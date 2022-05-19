import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHouseholdExpenseComponent } from './select-household-expense.component';

describe('SelectHouseholdExpenseComponent', () => {
  let component: SelectHouseholdExpenseComponent;
  let fixture: ComponentFixture<SelectHouseholdExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectHouseholdExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectHouseholdExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
