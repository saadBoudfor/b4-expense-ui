import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ExpenseListComponent} from './expense-list.component';
import {ExpenseRepository} from "../../../../../repositories/expenses/expense-repository.service";
import {NGXLogger} from "ngx-logger";
import {of, throwError} from "rxjs";

fdescribe('ExpenseListComponent', () => {
  let component: ExpenseListComponent;
  let fixture: ComponentFixture<ExpenseListComponent>;
  let expenseRepositoryMock = jasmine.createSpyObj(['getLast', 'get']);
  let loggerMock = jasmine.createSpyObj(['info', 'warn', 'error']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseListComponent],
      providers: [
        {provide: ExpenseRepository, useValue: expenseRepositoryMock},
        {provide: NGXLogger, useValue: loggerMock},
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    expenseRepositoryMock.get.and.returnValue(of([] as any[]));
    expenseRepositoryMock.getLast.and.returnValue(of([{id: 5}] as any[]));
    fixture = TestBed.createComponent(ExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all expenses for current user if mode set to default', fakeAsync(() => {
    component.mode = {mode: 'default'};
    tick();
    expect(expenseRepositoryMock.get).toHaveBeenCalled();
    expect(component.expenses).toEqual([]);
  }))

  it('should load all expenses for current user if mode set to all', fakeAsync(() => {
    component.mode = {mode: 'all'};
    tick();
    expect(expenseRepositoryMock.get).toHaveBeenCalled();
    expect(component.expenses).toEqual([]);
  }))

  it('should load last 5 expenses for current user if mode set to last5', fakeAsync(() => {
    component.mode = {mode: 'last5'};
    tick();
    expect(expenseRepositoryMock.getLast).toHaveBeenCalled();
    expect(component.expenses).toEqual([{id: 5} as any]);
  }))

  it('should log error and set error flag to true if request throw error', fakeAsync(() => {
    expenseRepositoryMock.get.and.returnValue(throwError({reason: 'some error'}))
    component.mode = {mode: 'all'};
    tick();
    expect(component.error).toBeTrue();
  }))

  it('should log error and set error flag to true if request throw error (last5)', fakeAsync(() => {
    expenseRepositoryMock.getLast.and.returnValue(throwError({reason: 'some error'}))
    component.mode = {mode: 'last5'};
    tick();
    expect(component.error).toBeTrue();
  }))
});
