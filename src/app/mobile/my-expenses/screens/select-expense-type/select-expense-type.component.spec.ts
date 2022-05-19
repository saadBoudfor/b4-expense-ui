import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExpenseTypeComponent } from './select-expense-type.component';

describe('SelectExpenseTypeComponent', () => {
  let component: SelectExpenseTypeComponent;
  let fixture: ComponentFixture<SelectExpenseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectExpenseTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExpenseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
