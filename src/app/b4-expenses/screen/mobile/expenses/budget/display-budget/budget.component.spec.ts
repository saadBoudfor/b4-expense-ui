import {BudgetComponent} from './budget.component';
import {fakeAsync, tick} from "@angular/core/testing";
import {of, throwError} from "rxjs";

fdescribe('BudgetComponent', () => {
  let component: BudgetComponent;
  let budgetServiceMock: any;
  let expenseStatsRepositoryMock: any;
  let ngxLoggerMock: any;

  beforeEach(() => {
    budgetServiceMock = jasmine.createSpyObj(['getByUserId']);
    expenseStatsRepositoryMock = jasmine.createSpyObj(['getBasicStats']);
    ngxLoggerMock = jasmine.createSpyObj(['error']);
  })

  it('should display current budget success', fakeAsync(() => {

    budgetServiceMock.getByUserId.and.returnValue(of({
      id: 4,
      date: '2022-01-01',
      target: 222.2,
      user: {
        id: 5,
        lastname: 'smith',
        name: 'william'
      }
    }))

    expenseStatsRepositoryMock.getBasicStats.and.returnValue(of({
      target: 50,
      total: 1,
      count: 90,
      countForCurrentWeek: 10,
      totalForCurrentWeek: 1
    }))

    component = new BudgetComponent(budgetServiceMock, expenseStatsRepositoryMock, ngxLoggerMock);
    component.ngOnInit();

    tick();

    expect(component.budget).toEqual({
      id: 4,
      date: '2022-01-01',
      target: 222.2,
      user: {
        id: 5,
        lastname: 'smith',
        name: 'william'
      }
    });

    expect(component.expenseBasicStats).toEqual({
      target: 50,
      total: 1,
      count: 90,
      countForCurrentWeek: 10,
      totalForCurrentWeek: 1
    });
    expect(budgetServiceMock.getByUserId).toHaveBeenCalledTimes(1);
    expect(expenseStatsRepositoryMock.getBasicStats).toHaveBeenCalledTimes(1);

  }))

  it('should log error if failed to log budget information', fakeAsync(() => {
    budgetServiceMock.getByUserId.and.returnValue(throwError({reason: 'some random error'}));
    expenseStatsRepositoryMock.getBasicStats.and.returnValue(throwError({reason: 'some random error'}));

    component = new BudgetComponent(budgetServiceMock, expenseStatsRepositoryMock, ngxLoggerMock);
    component.ngOnInit();

    tick();

    expect(component.expenseBasicStats).toBeNull();
    expect(component.budget).toBeNull();
    expect(budgetServiceMock.getByUserId).toHaveBeenCalledTimes(1);
    expect(expenseStatsRepositoryMock.getBasicStats).toHaveBeenCalledTimes(1);
    expect(ngxLoggerMock.error).toHaveBeenCalledTimes(2);
  }))

});
