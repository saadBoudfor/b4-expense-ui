import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesByMonthStatsSectionComponent } from './expenses-by-month-stats-section.component';
import {HttpClient} from "@angular/common/http";

fdescribe('ExpensesByMonthStatsSectionComponent', () => {
  let component: ExpensesByMonthStatsSectionComponent;
  let fixture: ComponentFixture<ExpensesByMonthStatsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpensesByMonthStatsSectionComponent ],
      imports: [HttpClient]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesByMonthStatsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
