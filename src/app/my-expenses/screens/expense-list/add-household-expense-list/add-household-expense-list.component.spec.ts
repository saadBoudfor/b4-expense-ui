import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseholdExpenseListComponent } from './add-household-expense-list.component';

describe('AddHouseholdExpenseListComponent', () => {
  let component: AddHouseholdExpenseListComponent;
  let fixture: ComponentFixture<AddHouseholdExpenseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHouseholdExpenseListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHouseholdExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
