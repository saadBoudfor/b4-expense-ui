import {ExpensesStatsRepository} from './expenses-stats-repository.service';
import {fakeAsync} from "@angular/core/testing";
import {of} from "rxjs";
import {ExpenseBasicStats} from "../../b4-expenses/models/expenses/ExpenseBasicStats";

fdescribe('ExpensesStatsRepositoryService', () => {
  let service: ExpensesStatsRepository;
  let loggerMock: any;
  let httpClient: any;

  beforeEach(() => {
    loggerMock = jasmine.createSpyObj(['info', 'debug', 'error']);
    httpClient = jasmine.createSpyObj(['get']);

    loggerMock.debug.and.callFake((data: any) => console.debug(data));
    loggerMock.info.and.callFake((data: any) => console.info(data));
    loggerMock.error.and.callFake((data: any) => console.error(data));

  });

  it('should be created', () => {
    service = new ExpensesStatsRepository(httpClient, loggerMock);
    expect(service).toBeTruthy();
  });

  it('should get restaurant stats success', fakeAsync(() => {
    httpClient.get.and.returnValue(of({
      target: 20,
      total: 500,
      count: 6,
      countForCurrentWeek: 45,
      totalForCurrentWeek: 12
    } as ExpenseBasicStats))

    service = new ExpensesStatsRepository(httpClient, loggerMock);

    service.getRestaurants().subscribe(data => {
      expect(data.total).toEqual(500);
      expect(data.target).toEqual(20);
      expect(data.count).toEqual(6);
    })
  }))

  it('should get stores stats success', fakeAsync(() => {
    httpClient.get.and.returnValue(of({
      target: 20,
      total: 500,
      count: 6,
      countForCurrentWeek: 45,
      totalForCurrentWeek: 12
    } as ExpenseBasicStats))

    service = new ExpensesStatsRepository(httpClient, loggerMock);

    service.getStores().subscribe(data => {
      expect(data.total).toEqual(500);
      expect(data.target).toEqual(20);
      expect(data.count).toEqual(6);
    })
  }))
});
