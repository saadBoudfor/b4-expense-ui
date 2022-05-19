import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ExpensesByMonthStatsSectionComponent} from './expenses-by-month-stats-section.component';
import {ExpenseRepository} from "../../../../../repositories/expenses/expense-repository.service";
import {NGXLogger} from "ngx-logger";
import {of, throwError} from "rxjs";
import {findCachePath} from "@angular-devkit/build-angular/src/utils/cache-path";

fdescribe('ExpensesByMonthStatsSectionComponent', () => {
  let component: ExpensesByMonthStatsSectionComponent;
  let fixture: ComponentFixture<ExpensesByMonthStatsSectionComponent>;

  let expenseRepositoryMock = jasmine.createSpyObj(['getStats']);
  let loggerMock = jasmine.createSpyObj(['info', 'error']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpensesByMonthStatsSectionComponent],
      providers: [
        {provide: ExpenseRepository, useValue: expenseRepositoryMock},
        {provide: NGXLogger, useValue: loggerMock}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    expenseRepositoryMock.getStats.and.returnValue(of({total: 5, count: 6}));
    fixture = TestBed.createComponent(ExpensesByMonthStatsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load chart data on component init', () => {
    expect(component.expenseBasicStats.total).toEqual(5);
    expect(component.expenseBasicStats.count).toEqual(6);
  })

  it('should set component error flag to true if failed to load chart data on component init', fakeAsync(() => {
    expenseRepositoryMock.getStats.and.returnValue(throwError({reason: 'some error'}));
    fixture = TestBed.createComponent(ExpensesByMonthStatsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.error).toBeTrue();
  }))
});
