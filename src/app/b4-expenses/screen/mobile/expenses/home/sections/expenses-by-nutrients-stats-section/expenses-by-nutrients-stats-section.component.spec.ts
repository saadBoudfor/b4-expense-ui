import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesByNutrientsStatsSectionComponent } from './expenses-by-nutrients-stats-section.component';

fdescribe('ExpensesByNutrientsStatsSectionComponent', () => {
  let component: ExpensesByNutrientsStatsSectionComponent;
  let fixture: ComponentFixture<ExpensesByNutrientsStatsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesByNutrientsStatsSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesByNutrientsStatsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
