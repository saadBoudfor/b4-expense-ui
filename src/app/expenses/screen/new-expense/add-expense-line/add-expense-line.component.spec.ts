import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpenseLineComponent } from './add-expense-line.component';

describe('AddExpenseLineComponent', () => {
  let component: AddExpenseLineComponent;
  let fixture: ComponentFixture<AddExpenseLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpenseLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpenseLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
