import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {AddHouseholdExpenseLigneComponent} from './add-household-expense-ligne.component';
import {NGXLogger} from "ngx-logger";
import {ExpenseService} from "../../../../../services/expenses/expense.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {TranslateModule} from "@ngx-translate/core";

fdescribe('AddHouseholdExpenseLigneComponent', () => {
  let component: AddHouseholdExpenseLigneComponent;
  let fixture: ComponentFixture<AddHouseholdExpenseLigneComponent>;

  // create mocks
  let expenseServiceMock: any;
  let loggerMock: any;

  const buildComponent = () => {
    fixture = TestBed.createComponent(AddHouseholdExpenseLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  beforeEach(() => {
    expenseServiceMock = jasmine.createSpyObj(['updateDraft', 'getCurrentDraft']);
    loggerMock = jasmine.createSpyObj(['debug', 'info', 'warn', 'error']);

    loggerMock.info.and.callFake((data: any) => console.info(data));
    loggerMock.warn.and.callFake((data: any) => console.info(data));

    expenseServiceMock.getCurrentDraft.and.returnValue({id: 6, expenseLines: []})
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [AddHouseholdExpenseLigneComponent],
      providers: [
        {provide: NGXLogger, useValue: loggerMock},
        {provide: ExpenseService, useValue: expenseServiceMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    buildComponent();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    tick();
    expect(component.expense.id).toEqual(6);
  }));

  it('should create empty expense if failed to load data', fakeAsync(() => {
    expenseServiceMock.getCurrentDraft.and.returnValue(undefined);
    buildComponent();
    tick();
    expect(component.expense.id).toBeUndefined();
  }));

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

  it('should save new expense line success', () => {
    component.expenseLine = {id: '66'} as any;
    component.save();
    expect(component.expense.expenseLines.length).toEqual(1);
    expect(component.expense.expenseLines[0].id).toEqual('66');
  })
});

