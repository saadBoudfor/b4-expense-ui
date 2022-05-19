import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { ExpenseDetailsComponent } from './expense-details.component';
import {TranslateModule} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {ExpenseService} from "../../../../services/expenses/expense.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {of, throwError} from "rxjs";
import {DatePipe} from "../../../b4-common/pipes/date/date.pipe";
import {Expense} from "../../../../data-model/expenses/Expense";

fdescribe('ExpenseDetailsComponent', () => {
  let component: ExpenseDetailsComponent;
  let fixture: ComponentFixture<ExpenseDetailsComponent>;
  // create mocks
  let activatedRouteMock: any;
  let expenseServiceMock: any;
  let loggerMock: any;
  let snackBarMock: any;
  let sanitizerMock: any;

  beforeEach(() => {
    // init mocks
    activatedRouteMock= jasmine.createSpyObj([], ['activatedRoute'])
    expenseServiceMock = jasmine.createSpyObj(['getExpenseById']);
    sanitizerMock = jasmine.createSpyObj([ 'bypassSecurityTrustResourceUrl']);
    snackBarMock = jasmine.createSpyObj(['open']);
    loggerMock = jasmine.createSpyObj(['debug', 'info', 'warn', 'error']);

    // default mock behavior
    loggerMock.info.and.callFake((data: any) => console.info(data));
    loggerMock.error.and.callFake((data: any) => console.error(data));
    snackBarMock.open.and.callFake((data: any) => console.log(data));
    sanitizerMock.bypassSecurityTrustResourceUrl.and.callFake((data: any) => console.log(data));
    expenseServiceMock.getExpenseById.and.returnValue(of(savedExpense));
    activatedRouteMock.snapshot = {queryParams: {id: '5'}};

  })


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ ExpenseDetailsComponent, DatePipe ],
      providers: [
        {provide: NGXLogger, useValue: loggerMock},
        {provide: ExpenseService, useValue: expenseServiceMock},
        {provide: DomSanitizer, useValue: sanitizerMock},
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: MatSnackBar, useValue: snackBarMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    resetMockCalls();
    buildComponent();
  });

  it('should display error message if url expenseId is invalid', fakeAsync(() => {
    activatedRouteMock.snapshot = {queryParams: {id: undefined}};
    resetMockCalls();
    buildComponent();
    expect(loggerMock.error).toHaveBeenCalled();
    expect(snackBarMock.open).toHaveBeenCalledTimes(1);
  }))

  it('should display error message if server responds with error', fakeAsync(() => {
      activatedRouteMock.snapshot = {queryParams: {id: '6'}};
      expenseServiceMock.getExpenseById.and.returnValue(throwError({reason:'server error'}))
      resetMockCalls();
      buildComponent();
      expect(loggerMock.error).toHaveBeenCalledTimes(1);
      expect(snackBarMock.open).toHaveBeenCalledTimes(1);
      expect(component.expense).toBeUndefined();
  }))

  it('should update component expense if server responds success', fakeAsync(() => {
    expect(component.expense).toEqual(savedExpense);
    expect(loggerMock.error).toHaveBeenCalledTimes(0);
    expect(snackBarMock.open).toHaveBeenCalledTimes(0);
  }))

  function buildComponent() {
    fixture = TestBed.createComponent(ExpenseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function resetMockCalls() {
    snackBarMock.open.calls.reset();
  }
});

const savedExpense: Expense ={
  id: 6,
  name: 'saved expense',
  expenseLines: [],
  place: {
    id: 8,
    type: 'STORE',
    name: 'saved place',
    address: {
      street: 'some street',
      zipCode: '0000',
      city: 'city',
      country: 'country'
    }
  }
}
