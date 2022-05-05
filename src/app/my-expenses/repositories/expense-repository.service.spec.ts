import {ExpenseRepository} from './expense-repository.service';
import {fakeAsync, tick} from "@angular/core/testing";
import {of, throwError} from "rxjs";
import {ExpenseBasicStats} from "../models/ExpenseBasicStats";

fdescribe('ExpenseRepositoryService', () => {
  let repository: ExpenseRepository;
  let expenseRepositoryMock: any;
  let loggerMock: any;

  beforeEach(() => {
    expenseRepositoryMock = jasmine.createSpyObj(['get']);
    loggerMock = jasmine.createSpyObj(['info', 'debug', 'error']);

    loggerMock.debug.and.callFake((data: any) => console.debug(data));
    loggerMock.info.and.callFake((data: any) => console.info(data));
    loggerMock.error.and.callFake((data: any) => console.error(data));

  });

  it('should get basic stats success', fakeAsync(() => {
    expenseRepositoryMock.get.and.returnValue(of(basicStats));

    repository = new ExpenseRepository(expenseRepositoryMock, loggerMock);
    tick();

    repository.getStats().subscribe(data => {
      expect(data).toEqual(basicStats);
      expect(loggerMock.debug).toHaveBeenCalledTimes(2);
      expect(loggerMock.error).toHaveBeenCalledTimes(0);
    })

  }))

  it('should log error if get basic stats failed', fakeAsync(() => {
    expenseRepositoryMock.get.and.returnValue(throwError(new Error('error')));

    repository = new ExpenseRepository(expenseRepositoryMock, loggerMock);
    tick();

    repository.getStats().subscribe(data => {

    }, error => {
      expect(loggerMock.debug).toHaveBeenCalledTimes(2);
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    })

  }))

  it('should get last expenses success', fakeAsync(() => {
    // Given:
    expenseRepositoryMock.get.and.returnValue(of(expenses));

    // When:
    repository = new ExpenseRepository(expenseRepositoryMock, loggerMock);
    tick();

    repository.getLast().subscribe(data => {
      expect(data).toEqual(expenses);
      expect(loggerMock.error).toHaveBeenCalledTimes(0);
      expect(loggerMock.debug).toHaveBeenCalledTimes(1);
    })
  }))

  it('should log error if get last expenses failed', fakeAsync(() => {
    // Given:
    expenseRepositoryMock.get.and.returnValue(throwError({error: 'error'}));

    // When:
    repository = new ExpenseRepository(expenseRepositoryMock, loggerMock);
    tick();

    repository.getLast().subscribe(() => {
    }, error => {
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    })
  }))


  it('should log error if get basic stats failed', fakeAsync(() => {
    expenseRepositoryMock.get.and.returnValue(throwError(new Error('error')));

    repository = new ExpenseRepository(expenseRepositoryMock, loggerMock);
    tick();

    repository.get().subscribe(data => {

    }, error => {
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
    })

  }))

  it('should get all expenses success', fakeAsync(() => {
    // Given:
    expenseRepositoryMock.get.and.returnValue(of(expenses));

    // When:
    repository = new ExpenseRepository(expenseRepositoryMock, loggerMock);
    tick();

    repository.get().subscribe(data => {
      expect(data).toEqual(expenses);
      expect(loggerMock.error).toHaveBeenCalledTimes(0);
      expect(loggerMock.debug).toHaveBeenCalledTimes(1);
    })
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
