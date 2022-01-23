import {ExpenseDetailsComponent} from './expense-details.component';
import {fakeAsync, tick} from "@angular/core/testing";
import {of, throwError} from "rxjs";

fdescribe('ExpenseDetailsComponent', () => {
  let component: ExpenseDetailsComponent;
  let expenseRepositoryMock: any;
  let locationMock: any;
  let routerMock: any;
  let loggerMock: any;
  let activatedRouteServiceMock: any;

  beforeEach(() => {
    expenseRepositoryMock = jasmine.createSpyObj(['getExpenseByID', 'delete', 'addBill']);
    locationMock = jasmine.createSpyObj(['info']);
    routerMock = jasmine.createSpyObj(['navigate']);
    loggerMock = jasmine.createSpyObj(['info', 'error', 'warn']);
    activatedRouteServiceMock = jasmine.createSpyObj(['info']);
  })

  it('should load expense details from backend', fakeAsync(() => {
    expenseRepositoryMock.getExpenseByID.and.returnValue(of({
      id: 6,
      name: 'expense_name',
      expenseLines: [],
      date: '2022-01-01',
      comment: 'some comment',
      author: {id: 5, name: 'william', lastname: 'smith'},
      user: {id: 5, name: 'william', lastname: 'smith'},
      place: {id: 6, name: 'restaurant t', type: 'RESTAURANT', address: {id: 66}}

    }))
    activatedRouteServiceMock = {
      snapshot: {
        queryParams: {id: 6}
      }
    }
    component = new ExpenseDetailsComponent(expenseRepositoryMock,
      locationMock,
      routerMock,
      loggerMock,
      activatedRouteServiceMock);

    component.ngOnInit();
    tick();

    expect(component.expense).toEqual({
      id: 6,
      name: 'expense_name',
      expenseLines: [],
      date: '2022-01-01',
      comment: 'some comment',
      author: {id: 5, name: 'william', lastname: 'smith'},
      user: {id: 5, name: 'william', lastname: 'smith'},
      place: {id: 6, name: 'restaurant t', type: 'RESTAURANT', address: {id: 66}}
    });
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
  }))
  it('should log error if failed on load expense details', fakeAsync(() => {
    expenseRepositoryMock.getExpenseByID.and.returnValue(throwError({reason: 'http error'}));
    activatedRouteServiceMock = {
      snapshot: {
        queryParams: {id: 6}
      }
    }
    component = new ExpenseDetailsComponent(expenseRepositoryMock,
      locationMock,
      routerMock,
      loggerMock,
      activatedRouteServiceMock);

    component.ngOnInit();
    tick();

    expect(loggerMock.error).toHaveBeenCalledTimes(1);
  }))
  it('should redirect to expenses home page if component was loaded with invalid params', fakeAsync(() => {
    activatedRouteServiceMock = {
      snapshot: {
        queryParams: {id: ''}
      }
    }
    routerMock.navigate.and.returnValue(Promise.resolve('success'));
    component = new ExpenseDetailsComponent(expenseRepositoryMock,
      locationMock,
      routerMock,
      loggerMock,
      activatedRouteServiceMock);

    component.ngOnInit();
    tick();

    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/expenses']);
  }))
  it('should log error if failed to redirect to expenses home page when load component with invalid params', fakeAsync(() => {
    activatedRouteServiceMock = {
      snapshot: {
        queryParams: {id: ''}
      }
    }
    routerMock.navigate.and.returnValue(Promise.reject({reason: 'failed'}));
    component = new ExpenseDetailsComponent(expenseRepositoryMock,
      locationMock,
      routerMock,
      loggerMock,
      activatedRouteServiceMock);

    component.ngOnInit();
    tick();

    expect(loggerMock.error).toHaveBeenCalledTimes(2);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/expenses']);
  }))

  it('should delete expense and redirect to home page after delete click', fakeAsync(() => {
    expenseRepositoryMock.delete.and.returnValue(of({mess: 'success'}));
    routerMock.navigate.and.returnValue(Promise.resolve({reason: 'success'}))

    component = new ExpenseDetailsComponent(expenseRepositoryMock,
      locationMock,
      routerMock,
      loggerMock,
      activatedRouteServiceMock);

    component.expense = {
      id: 6,
      name: 'expense_name',
      expenseLines: [],
      date: '2022-01-01',
      comment: 'some comment',
      author: {id: 5, name: 'william', lastname: 'smith'},
      user: {id: 5, name: 'william', lastname: 'smith'},
      place: {id: 6, name: 'restaurant t', type: 'RESTAURANT', address: {id: 66}}
    }

    component.delete();
    tick();

    expect(expenseRepositoryMock.delete).toHaveBeenCalledOnceWith(6);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/expenses']);
    expect(loggerMock.error).toHaveBeenCalledTimes(0);
  }))

  it('should log error if failed to delete after delete click ', fakeAsync(() => {
    expenseRepositoryMock.delete.and.returnValue(throwError({mess: 'failed'}));
    routerMock.navigate.and.returnValue(Promise.resolve({reason: 'success'}))

    component = new ExpenseDetailsComponent(expenseRepositoryMock,
      locationMock,
      routerMock,
      loggerMock,
      activatedRouteServiceMock);

    component.expense = {
      id: 6,
      name: 'expense_name',
      expenseLines: [],
      date: '2022-01-01',
      comment: 'some comment',
      author: {id: 5, name: 'william', lastname: 'smith'},
      user: {id: 5, name: 'william', lastname: 'smith'},
      place: {id: 6, name: 'restaurant t', type: 'RESTAURANT', address: {id: 66}}
    }

    component.delete();
    tick();

    expect(expenseRepositoryMock.delete).toHaveBeenCalledOnceWith(6);
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledTimes(0);
  }))

  it('should log error if failed to redirect after delete ', fakeAsync(() => {
    expenseRepositoryMock.delete.and.returnValue(of({mess: 'success'}));
    routerMock.navigate.and.returnValue(Promise.reject({reason: 'error'}))

    component = new ExpenseDetailsComponent(expenseRepositoryMock,
      locationMock,
      routerMock,
      loggerMock,
      activatedRouteServiceMock);

    component.expense = {
      id: 6,
      name: 'expense_name',
      expenseLines: [],
      date: '2022-01-01',
      comment: 'some comment',
      author: {id: 5, name: 'william', lastname: 'smith'},
      user: {id: 5, name: 'william', lastname: 'smith'},
      place: {id: 6, name: 'restaurant t', type: 'RESTAURANT', address: {id: 66}}
    }

    component.delete();
    tick();

    expect(expenseRepositoryMock.delete).toHaveBeenCalledOnceWith(6);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/expenses']);
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
  }))

  it('should log error if upload bill for an empty (or invalid) expense', fakeAsync(() => {

    component = new ExpenseDetailsComponent(expenseRepositoryMock,
      locationMock,
      routerMock,
      loggerMock,
      activatedRouteServiceMock);

    component.onBillUpload(null);

    expect(loggerMock.error).toHaveBeenCalledTimes(1);
  }))


  it('should upload bill success', fakeAsync(() => {
    expenseRepositoryMock.addBill.and.returnValue(of({
      id: 6,
      name: 'expense_name',
      expenseLines: [],
      date: '2022-01-01',
      comment: 'some comment',
      author: {id: 5, name: 'william', lastname: 'smith'},
      user: {id: 5, name: 'william', lastname: 'smith'},
      place: {id: 6, name: 'restaurant t', type: 'RESTAURANT', address: {id: 66}}
    }))


    component = new ExpenseDetailsComponent(expenseRepositoryMock,
      locationMock,
      routerMock,
      loggerMock,
      activatedRouteServiceMock);

    component.expense = {
      id: 6,
      name: 'expense_name',
      expenseLines: [],
      date: '2022-01-01',
      comment: 'some comment',
      author: {id: 5, name: 'william', lastname: 'smith'},
      user: {id: 5, name: 'william', lastname: 'smith'},
      place: {id: 6, name: 'restaurant t', type: 'RESTAURANT', address: {id: 66}}
    }

    component.onBillUpload('bill');
    tick();


    expect(loggerMock.error).toHaveBeenCalledTimes(0);

  }))


});
