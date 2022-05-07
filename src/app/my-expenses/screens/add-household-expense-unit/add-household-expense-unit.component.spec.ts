import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AddHouseholdExpenseUnitComponent} from './add-household-expense-unit.component';
import {Router} from "@angular/router";
import {NGXLogger} from "ngx-logger";
import {ExpenseService} from "../../services/expense.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {TranslateModule, TranslatePipe, TranslateService} from "@ngx-translate/core";
import {MatSnackBar} from "@angular/material/snack-bar";
import {of, throwError} from "rxjs";

fdescribe('AddHouseholdExpenseUnitComponent', () => {
  let component: AddHouseholdExpenseUnitComponent;
  let fixture: ComponentFixture<AddHouseholdExpenseUnitComponent>;

  // create mocks
  let expenseServiceMock: any;
  let routerMock: any;
  let loggerMock: any;
  let snackBarMock: any;

  beforeEach(() => {
    expenseServiceMock = jasmine.createSpyObj(['createAndSave', 'updateBill', 'clear']);
    routerMock = jasmine.createSpyObj(['navigate']);
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
      declarations: [AddHouseholdExpenseUnitComponent],
      providers: [
        {provide: NGXLogger, useValue: loggerMock},
        {provide: ExpenseService, useValue: expenseServiceMock},
        {provide: Router, useValue: routerMock},
        {provide: MatSnackBar, useValue: snackBarMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHouseholdExpenseUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isScanningProduct).toBeFalse();
    expect(component.isFilteringProduct).toBeFalse();
    expect(expenseServiceMock.clear).toHaveBeenCalledTimes(1);
    expect(component.expense.expenseLines.length).toEqual(1);
  });

  it('should upload bill success', fakeAsync(() => {
    // Given
    expenseServiceMock.updateBill.and.callFake((data: any) => console.log(data));

    // When
    component.uploadBill({id: 4});

    // Then
    expect(expenseServiceMock.updateBill).toHaveBeenCalledOnceWith({id: 4});
    expect(loggerMock.info).toHaveBeenCalledTimes(2)
  }))


  it('should update expense place success', () => {
    // Given
    component.onSelectPlace({id: 4, name: '8', address: {street: '4 rue'}, type: "STORE"});

    // Then
    expect(component.expense.place).toEqual({id: 4, name: '8', address: {street: '4 rue'}, type: "STORE"})
    expect(loggerMock.info).toHaveBeenCalledTimes(2);
    expect(loggerMock.error).toHaveBeenCalledTimes(0);
  })

  it('should log error (snackbar and console) if given expense place invalid', () => {
    // Given
    component.onSelectPlace({id: 4, name: '8', address: null, type: "STORE"} as any);

    // Then
    expect(component.expense.place).toBeUndefined();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(snackBarMock.open).toHaveBeenCalledTimes(1);
  })

  it('should update product with scanner success', () => {
    // Given
    component.isScanningProduct = true;
    // When
    component.onScanProduct({id: 5, name: 'product'} as any)
    // Then
    expect(component.isScanningProduct).toBeFalse();
    expect(component.productName).toEqual('product');
  })

  it('should update product with search utility success', () => {
    // Given
    component.isFilteringProduct = true;
    // When
    component.onSelectProduct({id: 5, name: 'product'} as any)
    // Then
    expect(component.isFilteringProduct).toBeFalse();
    expect(component.productName).toEqual('product');
  })

  it('should submit new expense success', fakeAsync(() => {
    // Given
    routerMock.navigate.and.returnValue(Promise.resolve({redirect: true}));
    expenseServiceMock.createAndSave.and.returnValue(of({id: 4}));

    // When
    component.validate();
    tick();

    // Then
    expect(loggerMock.info).toHaveBeenCalledTimes(2);
    expect(routerMock.navigate).toHaveBeenCalledOnceWith(['/expenses/home']);
  }))

  it('should display and log error if submit new expense failed', fakeAsync(() => {
    // Given
    routerMock.navigate.and.returnValue(Promise.resolve({redirect: true}));
    expenseServiceMock.createAndSave.and.returnValue(throwError({reason: 'some error'}));

    // When
    component.validate();
    tick();

    // Then
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(snackBarMock.open).toHaveBeenCalledTimes(1);
  }))
});
