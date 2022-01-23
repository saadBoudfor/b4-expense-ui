import {LastExpensesComponent} from './last-expenses.component';
import {fakeAsync, tick} from "@angular/core/testing";
import {of, throwError} from "rxjs";

fdescribe('LastExpensesComponent', () => {
  let component: LastExpensesComponent;

  it('should redirect to expense details page when click on expense', fakeAsync(() => {
    const expenseRepositoryMock = jasmine.createSpyObj(['fetchLastExpenses']);
    const ngxLoggerMock = jasmine.createSpyObj(['info', 'error']);
    const routerMock = jasmine.createSpyObj(['navigate']);

    routerMock.navigate.and.returnValue(Promise.resolve('test'))
    component = new LastExpensesComponent(expenseRepositoryMock, ngxLoggerMock, routerMock);
    component.onClick({
      id: 6,
      expenseLines: [],
      place: {
        id: 54,
        name: 'ok',
        type: 'RESTAURANT',
        address: {
          id: 5
        }
      }
    })

    tick(); // oblige l'observable a émiter une donnée

    expect(routerMock.navigate).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/expense-details'], {queryParams: {id: 6}});
  }))

  it('should log error if expense or expense\'s id is missing', fakeAsync(() => {
    const expenseRepositoryMock = jasmine.createSpyObj(['fetchLastExpenses']);
    const ngxLoggerMock = jasmine.createSpyObj(['info', 'error']);
    const routerMock = jasmine.createSpyObj(['navigate']);

    routerMock.navigate.and.returnValue(Promise.resolve('test'))
    component = new LastExpensesComponent(expenseRepositoryMock, ngxLoggerMock, routerMock);
    component.onClick({
      id: undefined,
      expenseLines: [],
      place: {
        id: 54,
        name: 'ok',
        type: 'RESTAURANT',
        address: {
          id: 5
        }
      }
    });
    expect(routerMock.navigate).toHaveBeenCalledTimes(0);
    expect(ngxLoggerMock.error).toHaveBeenCalledOnceWith('cannot select empty expense (or with empty id)');
  }))


  it('should log error if cannot redirect to details page', fakeAsync(() => {
    const expenseRepositoryMock = jasmine.createSpyObj(['fetchLastExpenses']);
    const ngxLoggerMock = jasmine.createSpyObj(['info', 'error']);
    const routerMock = jasmine.createSpyObj(['navigate']);

    routerMock.navigate.and.returnValue(Promise.reject({error: 'some random error occurred'}));
    component = new LastExpensesComponent(expenseRepositoryMock, ngxLoggerMock, routerMock);

    component.onClick({
      id: 6,
      expenseLines: [],
      place: {
        id: 54,
        name: 'ok',
        type: 'RESTAURANT',
        address: {
          id: 5
        }
      }
    })

    tick(); // oblige l'observable a émiter une donnée

    expect(routerMock.navigate).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/expense-details'], {queryParams: {id: 6}});
    expect(ngxLoggerMock.error).toHaveBeenCalledOnceWith('failed to redirect to "/expense-details" page', {reason: {error: 'some random error occurred'}})
  }))

  it('should load and update local expense list success', fakeAsync(() => {
    // Given
    const expenseRepositoryMock = jasmine.createSpyObj(['fetchLastExpenses']);
    const ngxLoggerMock = jasmine.createSpyObj(['info', 'error']);
    const routerMock = jasmine.createSpyObj(['navigate']);

    expenseRepositoryMock.fetchLastExpenses.and.returnValue(of([
      {
        id: 6,
        expenseLines: [],
        place: {
          id: 54,
          name: 'ok',
          type: 'RESTAURANT',
          address: {
            id: 5
          }
        }
      }
    ]))

    // When
    component = new LastExpensesComponent(expenseRepositoryMock, ngxLoggerMock, routerMock);
    component.ngOnInit();
    tick();

    // Then

    expect(component.expenses).toEqual([
      {
        id: 6,
        expenseLines: [],
        place: {
          id: 54,
          name: 'ok',
          type: 'RESTAURANT',
          address: {
            id: 5
          }
        }
      }
    ]);

  }))

  it('should log error if failed to update expense list', fakeAsync(() => {
    // Given
    const expenseRepositoryMock = jasmine.createSpyObj(['fetchLastExpenses']);
    const ngxLoggerMock = jasmine.createSpyObj(['info', 'error']);
    const routerMock = jasmine.createSpyObj(['navigate']);

    expenseRepositoryMock.fetchLastExpenses.and.returnValue(throwError({error: 'error'}))

    // When
    component = new LastExpensesComponent(expenseRepositoryMock, ngxLoggerMock, routerMock);
    component.ngOnInit();
    tick();

    // Then
    expect(component.expenses).toBeUndefined();
    expect(ngxLoggerMock.error).toHaveBeenCalledTimes(1);
  }))
})
