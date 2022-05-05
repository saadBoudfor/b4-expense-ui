import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BudgetTrackerComponent} from './budget-tracker.component';
import {ExpenseRepository} from "../../../repositories/expense-repository.service";
import {NGXLogger} from "ngx-logger";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {of, throwError} from "rxjs";
import {ExpenseBasicStats} from "../../../models/ExpenseBasicStats";

fdescribe('BudgetTrackerComponent', () => {
  let component: BudgetTrackerComponent;
  let fixture: ComponentFixture<BudgetTrackerComponent>;

  let expenseRepositoryMock: any;
  let loggerMock: any;

  beforeEach(async () => {
    expenseRepositoryMock = jasmine.createSpyObj(['getStats']);
    loggerMock = jasmine.createSpyObj(['info', 'debug', 'error']);

    loggerMock.debug.and.callFake((data: any) => console.debug(data));
    loggerMock.info.and.callFake((data: any) => console.info(data));
    loggerMock.error.and.callFake((data: any) => console.error(data));

    await TestBed.configureTestingModule({
      providers: [
        {provide: ExpenseRepository, useValue: expenseRepositoryMock},
        {provide: NGXLogger, useValue: loggerMock},
      ],
      declarations: [BudgetTrackerComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });


  it('should create', () => {
    expenseRepositoryMock.getStats.and.returnValue(of(basicStats));

    initComponent();

    expect(component).toBeTruthy();
    expect(component.current).toBe(12);
    expect(component.target).toBe(120);
    expect(component.error).toBeFalse();
  });

  it('should set error to true if failed to load data', () => {
    expenseRepositoryMock.getStats.and.returnValue(throwError({error: 'error'}));

    initComponent();

    expect(component).toBeTruthy();
    expect(component.current).toBe(0);
    expect(component.target).toBe(0);
    expect(component.error).toBeTrue();
  })

  function initComponent() {
    fixture = TestBed.createComponent(BudgetTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});


const basicStats: ExpenseBasicStats = {
  target: 120,
  total: 250,
  count: 12,
  countForCurrentWeek: 45,
  totalForCurrentWeek: 100
}
