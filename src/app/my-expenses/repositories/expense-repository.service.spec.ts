import {ExpenseRepository} from './expense-repository.service';
import {fakeAsync, tick} from "@angular/core/testing";
import {of, throwError} from "rxjs";
import {ExpenseBasicStats} from "../models/ExpenseBasicStats";

fdescribe('ExpenseRepositoryService', () => {
  let repository: ExpenseRepository;
  let clientHttpMock: any;
  let loggerMock: any;

  beforeEach(() => {
    clientHttpMock = jasmine.createSpyObj(['get']);
    loggerMock = jasmine.createSpyObj(['info', 'debug', 'error', 'warn']);

    loggerMock.debug.and.callFake((data: any) => console.debug(data));
    loggerMock.info.and.callFake((data: any) => console.info(data));
    loggerMock.error.and.callFake((data: any) => console.error(data));

  });

  it('should get basic stats success', fakeAsync(() => {
    clientHttpMock.get.and.returnValue(of(basicStats));

    repository = new ExpenseRepository(clientHttpMock, loggerMock);
    tick();

    repository.getStats().subscribe(data => {
      expect(data).toEqual(basicStats);
      expect(loggerMock.debug).toHaveBeenCalledTimes(2);
      expect(loggerMock.error).toHaveBeenCalledTimes(0);
    })

  }))

  it('should log error if get basic stats failed', fakeAsync(() => {
    clientHttpMock.get.and.returnValue(throwError(new Error('error')));

    repository = new ExpenseRepository(clientHttpMock, loggerMock);
    tick();

    repository.getStats().subscribe(data => {

    }, error => {
      expect(loggerMock.debug).toHaveBeenCalledTimes(2);
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    })

  }))

  it('should get last expenses success', fakeAsync(() => {
    // Given:
    clientHttpMock.get.and.returnValue(of(expenses));

    // When:
    repository = new ExpenseRepository(clientHttpMock, loggerMock);
    tick();

    repository.getLast().subscribe(data => {
      expect(data).toEqual(expenses);
      expect(loggerMock.error).toHaveBeenCalledTimes(0);
      expect(loggerMock.debug).toHaveBeenCalledTimes(1);
    })
  }))

  it('should log error if get last expenses failed', fakeAsync(() => {
    // Given:
    clientHttpMock.get.and.returnValue(throwError({error: 'error'}));

    // When:
    repository = new ExpenseRepository(clientHttpMock, loggerMock);
    tick();

    repository.getLast().subscribe(() => {
    }, error => {
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    })
  }))


  it('should log error if get basic stats failed', fakeAsync(() => {
    clientHttpMock.get.and.returnValue(throwError(new Error('error')));

    repository = new ExpenseRepository(clientHttpMock, loggerMock);
    tick();

    repository.get().subscribe(data => {

    }, error => {
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    })

  }))

  it('should get all expenses success', fakeAsync(() => {
    // Given:
    clientHttpMock.get.and.returnValue(of(expenses));

    // When:
    repository = new ExpenseRepository(clientHttpMock, loggerMock);
    tick();

    repository.get().subscribe(data => {
      expect(data).toEqual(expenses);
      expect(loggerMock.error).toHaveBeenCalledTimes(0);
      expect(loggerMock.debug).toHaveBeenCalledTimes(1);
    })
  }))

  it('should get frequented restaurant success', fakeAsync(() => {
    // Given
    clientHttpMock.get.and.returnValue(of([{place: {id: 1}, total: 5, count: 1}]));
    repository = new ExpenseRepository(clientHttpMock, loggerMock);

    // When - Then
    repository.getTopFrequentedRestaurants()
      .subscribe(stats => {
        expect(loggerMock.debug).toHaveBeenCalledTimes(1);
        expect(stats[0].total).toEqual(5)
        expect(stats[0].count).toEqual(1)
      })
  }))


  it('should get frequented store success', fakeAsync(() => {
    // Given
    clientHttpMock.get.and.returnValue(of([{id: 1}, {id: 2}]));
    repository = new ExpenseRepository(clientHttpMock, loggerMock);

    // When - Then
    repository.getExpensesByPlaceId(5)
      .subscribe(expenses => {
        expect(loggerMock.debug).toHaveBeenCalledTimes(1);
        expect(expenses[0].id).toEqual(1)
        expect(expenses[1].id).toEqual(2)
      })
  }))

  it('should get expenses by id success', fakeAsync(() => {
    clientHttpMock.get.and.returnValue(of([{place: {id: 1}, total: 5, count: 1}]));
    repository = new ExpenseRepository(clientHttpMock, loggerMock);

  }))
});

const basicStats: ExpenseBasicStats = {
  target: 120,
  total: 250,
  count: 12,
  countForCurrentWeek: 45,
  totalForCurrentWeek: 100
}


const expenses: any[] = [
  {id: 5, name: 'expense1'},
  {id: 5, name: 'expense2'},
  {id: 5, name: 'expense3'}
]
