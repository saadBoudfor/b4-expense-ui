import {ExpensesByTypeSummarySectionComponent} from './expenses-by-type-summary-section.component';
import {fakeAsync, tick} from "@angular/core/testing";
import {of, throwError} from "rxjs";

fdescribe('ExpensesByTypeSummarySectionComponent', () => {
  let component: ExpensesByTypeSummarySectionComponent;
  let ngxLoggerMock: any;
  let expenseStatsRepositoryMock: any;

  beforeEach(() => {
    expenseStatsRepositoryMock = jasmine.createSpyObj(['getBasicRestaurantsStats', 'getBasicStoresStats']);
    ngxLoggerMock = jasmine.createSpyObj(['error']);
  })
  it('should display expense by type summary success', fakeAsync(() => {
    // Given
    expenseStatsRepositoryMock.getBasicStoresStats.and.returnValue(of({
      target: 250,
      total: 111,
      count: 6,
      countForCurrentWeek: 10,
      totalForCurrentWeek: 25
    }));

    expenseStatsRepositoryMock.getBasicRestaurantsStats.and.returnValue(of({
      target: 250,
      total: 111,
      count: 6,
      countForCurrentWeek: 10,
      totalForCurrentWeek: 25
    }));

    component = new ExpensesByTypeSummarySectionComponent(expenseStatsRepositoryMock, ngxLoggerMock);

    // When
    component.ngOnInit();
    tick();

    expect(component.data).not.toBeNull();
    expect(component.data?.percentageStore).toBe(50);
    expect(component.data?.percentageRestaurant).toBe(50);
    expect(expenseStatsRepositoryMock.getBasicStoresStats).toHaveBeenCalledTimes(1);
    expect(expenseStatsRepositoryMock.getBasicRestaurantsStats).toHaveBeenCalledTimes(1);
  }))

  it('should set dataLoadError to true if error occurred when load restaurants stats', fakeAsync(() => {

    expenseStatsRepositoryMock.getBasicRestaurantsStats.and.returnValue(throwError({error: 'some random error'}));

    expenseStatsRepositoryMock.getBasicStoresStats.and.returnValue(of({
      target: 250,
      total: 111,
      count: 6,
      countForCurrentWeek: 10,
      totalForCurrentWeek: 25
    }));

    component = new ExpensesByTypeSummarySectionComponent(expenseStatsRepositoryMock, ngxLoggerMock);


    // When
    component.ngOnInit();
    tick();

    expect(component.data).toBeNull();
    expect(ngxLoggerMock.error).toHaveBeenCalledTimes(1);
    expect(expenseStatsRepositoryMock.getBasicStoresStats).toHaveBeenCalledTimes(0);
    expect(expenseStatsRepositoryMock.getBasicRestaurantsStats).toHaveBeenCalledTimes(1);
  }))

  it('should set dataLoadError to true if error occurred when load stores stats', fakeAsync(() => {
    expenseStatsRepositoryMock.getBasicStoresStats.and.returnValue(throwError({error: 'some random error'}));

    expenseStatsRepositoryMock.getBasicRestaurantsStats.and.returnValue(of({
      target: 250,
      total: 111,
      count: 6,
      countForCurrentWeek: 10,
      totalForCurrentWeek: 25
    }));

    component = new ExpensesByTypeSummarySectionComponent(expenseStatsRepositoryMock, ngxLoggerMock);


    // When
    component.ngOnInit();
    tick();

    expect(component.data).toBeNull();
    expect(ngxLoggerMock.error).toHaveBeenCalledTimes(1);
    expect(expenseStatsRepositoryMock.getBasicStoresStats).toHaveBeenCalledTimes(1);
    expect(expenseStatsRepositoryMock.getBasicRestaurantsStats).toHaveBeenCalledTimes(1);
  }))
});
