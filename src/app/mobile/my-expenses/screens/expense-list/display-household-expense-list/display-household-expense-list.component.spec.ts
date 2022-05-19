import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {DisplayHouseholdExpenseListComponent} from './display-household-expense-list.component';
import {AddHouseholdExpenseListComponent} from "../add-household-expense-list/add-household-expense-list.component";
import {TranslateModule} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {ExpenseService} from "../../../../../services/expenses/expense.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NO_ERRORS_SCHEMA} from "@angular/core";


fdescribe('DisplayHouseholdExpenseListComponent', () => {
  let component: DisplayHouseholdExpenseListComponent;
  let fixture: ComponentFixture<DisplayHouseholdExpenseListComponent>;

  // create mocks
  let expenseServiceMock: any;
  let loggerMock: any;
  let snackBarMock: any;

  beforeEach(() => {
    expenseServiceMock = jasmine.createSpyObj(['updateDraft', 'getCurrentDraft']);
    snackBarMock = jasmine.createSpyObj(['open']);
    loggerMock = jasmine.createSpyObj(['debug', 'info', 'warn', 'error']);
    loggerMock.info.and.callFake((data: any) => console.info(data));
    loggerMock.error.and.callFake((data: any) => console.error(data));
    snackBarMock.open.and.callFake((data: any) => console.log(data));
    expenseServiceMock.updateDraft.and.callFake((data: any) => console.log(data));

  })


  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [DisplayHouseholdExpenseListComponent],
      providers: [
        {provide: NGXLogger, useValue: loggerMock},
        {provide: ExpenseService, useValue: expenseServiceMock},
        {provide: MatSnackBar, useValue: snackBarMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    buildComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update local expense variable if load expense success', fakeAsync(() => {
    // Given
    expenseServiceMock.getCurrentDraft.and.returnValue({id: 6, expenseLines: []});
    resetMockCalls();

    // When
    buildComponent();

    //Then
    expect(component.expense.id).toEqual(6);
    expect(loggerMock.info).toHaveBeenCalledTimes(2);

  }))
  it('should log and display error if not expense found in cache', fakeAsync(() => {
    // Given
    expenseServiceMock.getCurrentDraft.and.returnValue(undefined);
    resetMockCalls();

    // When
    buildComponent();

    //Then
    expect(component.expense.id).toBeUndefined();
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(snackBarMock.open).toHaveBeenCalledTimes(1);
  }))
  it('should call update draft in expense service on save click', fakeAsync(() => {
    // Given
    component.expense = {id: 8, expenseLines: []} as any;
    resetMockCalls();

    //When
    component.save();

    //Then
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(expenseServiceMock.updateDraft).toHaveBeenCalledOnceWith({id: 8, expenseLines: []})
  }))

  function buildComponent() {
    fixture = TestBed.createComponent(DisplayHouseholdExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function resetMockCalls() {
    loggerMock.error.calls.reset();
    loggerMock.info.calls.reset();
    snackBarMock.open.calls.reset();
  }
});
