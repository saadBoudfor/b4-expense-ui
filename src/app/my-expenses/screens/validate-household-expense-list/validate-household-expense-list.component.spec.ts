import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ValidateHouseholdExpenseListComponent} from './validate-household-expense-list.component';
import {of, throwError} from "rxjs";
import {Expense} from "../../models/Expense";
import {TranslateModule} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {ExpenseService} from "../../services/expense.service";
import {DomSanitizer} from "@angular/platform-browser";
import { Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {DatePipe} from "../../../b4-common/pipes/date/date.pipe";

fdescribe('ValidateHouseholdExpenseListComponent', () => {
  let component: ValidateHouseholdExpenseListComponent;
  let fixture: ComponentFixture<ValidateHouseholdExpenseListComponent>;

  // create mocks
  let expenseServiceMock: any;
  let loggerMock: any;
  let snackBarMock: any;
  let sanitizerMock: any;
  let routerMock: any;

  beforeEach(() => {
    // init mocks
    expenseServiceMock = jasmine.createSpyObj(['getCurrentDraft', 'validateExpense', 'clear']);
    sanitizerMock = jasmine.createSpyObj(['bypassSecurityTrustResourceUrl']);
    snackBarMock = jasmine.createSpyObj(['open']);
    loggerMock = jasmine.createSpyObj(['debug', 'info', 'warn', 'error']);
    routerMock = jasmine.createSpyObj(['navigate']);

    // default mock behavior
    loggerMock.info.and.callFake((data: any) => console.info(data));
    loggerMock.error.and.callFake((data: any) => console.error(data));
    snackBarMock.open.and.callFake((data: any) => console.log(data));
    routerMock.navigate.and.returnValue(Promise.resolve({redirect: true}));
    sanitizerMock.bypassSecurityTrustResourceUrl.and.callFake((data: any) => console.log(data));
    expenseServiceMock.getCurrentDraft.and.returnValue(savedExpense);
    expenseServiceMock.validateExpense.and.returnValue(of(savedExpense));

  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ValidateHouseholdExpenseListComponent, DatePipe],
      providers: [
        {provide: NGXLogger, useValue: loggerMock},
        {provide: ExpenseService, useValue: expenseServiceMock},
        {provide: DomSanitizer, useValue: sanitizerMock},
        {provide: Router, useValue: routerMock},
        {provide: MatSnackBar, useValue: snackBarMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    resetCallsCount();
    buildComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load expense data on init', () => {
    expect(component.expense).toEqual(savedExpense);
    expect(component.total).toEqual(0);
  })

  it('should clear cache and redirect to expense home page after saving expense', fakeAsync(() => {
    component.onValidate();

    tick();

    expect(expenseServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/expenses/home'])
  }))

  it('should display error if failed to save expense', () => {
    expenseServiceMock.validateExpense.and.returnValue(throwError({error: 'some server error'}));
    // buildComponent();
    // resetCallsCount();

    component.onValidate();

    expect(expenseServiceMock.clear).toHaveBeenCalledTimes(0);
    expect(routerMock.navigate).toHaveBeenCalledTimes(0);
  })

  function buildComponent() {
    fixture = TestBed.createComponent(ValidateHouseholdExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function resetCallsCount() {
    expenseServiceMock.clear.calls.reset();
    routerMock.navigate.calls.reset();
  }
});

const savedExpense: Expense = {
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
