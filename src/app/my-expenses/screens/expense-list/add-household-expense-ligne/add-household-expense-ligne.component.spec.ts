import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHouseholdExpenseLigneComponent } from './add-household-expense-ligne.component';

describe('AddHouseholdExpenseLigneComponent', () => {
  let component: AddHouseholdExpenseLigneComponent;
  let fixture: ComponentFixture<AddHouseholdExpenseLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHouseholdExpenseLigneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHouseholdExpenseLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
