import {DefineBudgetComponent} from './define-budget.component';
import {fakeAsync, tick} from "@angular/core/testing";
import {of, throwError} from "rxjs";

fdescribe('DefineBudgetComponent', () => {
  let component: DefineBudgetComponent;
  let routerMock: any;
  let budgetRepositoryMock: any;
  let loggerMock: any;

  beforeEach(() => {
    routerMock = jasmine.createSpyObj(['navigate']);
    budgetRepositoryMock = jasmine.createSpyObj(['getByUserId', 'save']);
    loggerMock = jasmine.createSpyObj(['error', 'warn']);
  })

  it('should load budget data success', fakeAsync(() => {
    budgetRepositoryMock.getByUserId.and.returnValue(of({
      id: 4,
      date: '2022-01-01',
      target: 222.2,
      user: {
        id: 5,
        lastname: 'smith',
        name: 'william'
      }
    }))

    component = new DefineBudgetComponent(routerMock, budgetRepositoryMock, loggerMock);
    component.target = '6';

    component.ngOnInit();
    tick();

    expect(component.target).toBe('222.2');
  }))

  it('should log error if failed to load budget data', fakeAsync(() => {
    budgetRepositoryMock.getByUserId.and.returnValue(throwError({reason: 'some reason'}));

    component = new DefineBudgetComponent(routerMock, budgetRepositoryMock, loggerMock);
    component.target = '222.2';

    component.ngOnInit();
    tick();

    expect(component.target).toBe('222.2');
    expect(loggerMock.error).toHaveBeenCalledTimes(1);

  }))

  it('should update budget and redirect success', fakeAsync(() => {
    routerMock.navigate.and.returnValue(Promise.resolve('success'));
    budgetRepositoryMock.save.and.returnValue(of({
      id: 4,
      date: '2022-01-01',
      target: 222.2,
      user: {
        id: 5,
        lastname: 'smith',
        name: 'william'
      }
    }));

    component = new DefineBudgetComponent(routerMock, budgetRepositoryMock, loggerMock);
    component.target = '6';

    component.update();

    tick();

    expect(budgetRepositoryMock.save).toHaveBeenCalledOnceWith('6', 1);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/b4-expenses/budget']);

  }))


  it('should log error when updated budget failed', fakeAsync(() => {
    budgetRepositoryMock.save.and.returnValue(throwError({error: 'error'}));

    component = new DefineBudgetComponent(routerMock, budgetRepositoryMock, loggerMock);
    component.target = '6';

    component.update();

    tick();

    expect(budgetRepositoryMock.save).toHaveBeenCalledOnceWith('6', 1);
    expect(routerMock.navigate).toHaveBeenCalledTimes(0);
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
  }))

  it('should log error when failed to redirect to budget page', fakeAsync(() => {
    routerMock.navigate.and.returnValue(Promise.reject({reason: 'error'}));
    budgetRepositoryMock.save.and.returnValue(of({
      id: 4,
      date: '2022-01-01',
      target: 222.2,
      user: {
        id: 5,
        lastname: 'smith',
        name: 'william'
      }
    }));

    component = new DefineBudgetComponent(routerMock, budgetRepositoryMock, loggerMock);
    component.target = '6';

    component.update();

    tick();

    expect(budgetRepositoryMock.save).toHaveBeenCalledOnceWith('6', 1);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/b4-expenses/budget']);
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
  }))


  it('should log error if target invalid', fakeAsync(() => {
    component = new DefineBudgetComponent(routerMock, budgetRepositoryMock, loggerMock);
    component.target = '';

    component.update();

    tick();

    expect(budgetRepositoryMock.save).toHaveBeenCalledTimes(0);
    expect(routerMock.navigate).toHaveBeenCalledTimes(0);
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
  }))
});

