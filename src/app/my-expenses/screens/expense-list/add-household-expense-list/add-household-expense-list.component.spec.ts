import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { AddHouseholdExpenseListComponent } from './add-household-expense-list.component';
import {TranslateModule} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {ExpenseService} from "../../../services/expense.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NO_ERRORS_SCHEMA} from "@angular/core";

fdescribe('AddHouseholdExpenseListComponent', () => {
  let component: AddHouseholdExpenseListComponent;
  let fixture: ComponentFixture<AddHouseholdExpenseListComponent>;

  // create mocks
  let expenseServiceMock: any;
  let loggerMock: any;
  let snackBarMock: any;

  beforeEach(() => {
    expenseServiceMock = jasmine.createSpyObj(['createNewDraft', 'updateBill', 'clear']);
    snackBarMock = jasmine.createSpyObj(['open']);

    loggerMock = jasmine.createSpyObj(['debug', 'info', 'warn', 'error']);

    loggerMock.debug.and.callFake((data: any) => console.debug(data));
    loggerMock.info.and.callFake((data: any) => console.info(data));
    loggerMock.error.and.callFake((data: any) => console.error(data));
    loggerMock.warn.and.callFake((data: any) => console.warn(data));
    snackBarMock.open.and.callFake((data: any) => console.log(data));

  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [ AddHouseholdExpenseListComponent ],
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
    fixture = TestBed.createComponent(AddHouseholdExpenseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should upload bill success', fakeAsync(() => {
    // Given
    expenseServiceMock.updateBill.and.callFake((data: any) => console.log(data));

    // When
    component.onUploadBill({id: 4});

    // Then
    expect(expenseServiceMock.updateBill).toHaveBeenCalledOnceWith({id: 4});
    expect(loggerMock.info).toHaveBeenCalledTimes(2)
  }))

  it('should update expense place success', () => {
    // Given
    component.onSelect({id: 4, name: '8', address: {street: '4 rue'}, type: "RESTAURANT"});

    // Then
    expect(component.expense.place).toEqual({id: 4, name: '8', address: {street: '4 rue'}, type: "RESTAURANT"})
    expect(loggerMock.info).toHaveBeenCalledTimes(2);
    expect(loggerMock.error).toHaveBeenCalledTimes(0);
  })

  it('should log error (snackbar and console) if given expense place invalid', () => {
    // Given
    component.onSelect({id: 4, name: '8', address: null, type: "RESTAURANT"} as any);

    // Then
    expect(component.expense.place).toBeUndefined();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(snackBarMock.open).toHaveBeenCalledTimes(1);
  })

  it('should save success', () => {
    component.save();
    expect(expenseServiceMock.createNewDraft).toHaveBeenCalledTimes(1);
  })

});
