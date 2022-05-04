import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRestaurantExpenseComponent } from './add-restaurant-expense.component';

describe('AddRestaurantExpenseComponent', () => {
  let component: AddRestaurantExpenseComponent;
  let fixture: ComponentFixture<AddRestaurantExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRestaurantExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRestaurantExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
