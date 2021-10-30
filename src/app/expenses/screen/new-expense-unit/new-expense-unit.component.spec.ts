import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewExpenseUnitComponent } from './new-expense-unit.component';

describe('NewExpenseUnitComponent', () => {
  let component: NewExpenseUnitComponent;
  let fixture: ComponentFixture<NewExpenseUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewExpenseUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewExpenseUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
