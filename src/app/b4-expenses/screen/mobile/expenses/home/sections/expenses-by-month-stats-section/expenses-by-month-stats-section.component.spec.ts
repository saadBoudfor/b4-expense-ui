import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesByMonthStatsSectionComponent } from './expenses-by-month-stats-section.component';

fdescribe('ExpensesByMonthStatsSectionComponent', () => {
  let component: ExpensesByMonthStatsSectionComponent;
  let fixture: ComponentFixture<ExpensesByMonthStatsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesByMonthStatsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesByMonthStatsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
