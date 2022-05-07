import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import {TopExpensesComponent} from './top-expenses.component';
import {of, throwError} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
import {DatePipe} from "../../../b4-common/pipes/date/date.pipe";
import {NGXLogger} from "ngx-logger";
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Expense} from "../../models/Expense";
import {ExpenseRepository} from "../../repositories/expense-repository.service";

fdescribe('TopExpensesComponent', () => {
  let component: TopExpensesComponent;
  let fixture: ComponentFixture<TopExpensesComponent>;

  // create mocks
  let activatedRouteMock: any;
  let expenseRepositoryMock: any;
  let loggerMock: any;
  let snackBarMock: any;
  let sanitizerMock: any;

  beforeEach(() => {
    // init mocks
    activatedRouteMock = jasmine.createSpyObj([], ['activatedRoute'])
    expenseRepositoryMock = jasmine.createSpyObj(['getTopFrequentedStores', 'getTopFrequentedRestaurants']);
    sanitizerMock = jasmine.createSpyObj(['bypassSecurityTrustResourceUrl']);
    snackBarMock = jasmine.createSpyObj(['open']);
    loggerMock = jasmine.createSpyObj(['debug', 'info', 'warn', 'error']);

    // default mock behavior
    loggerMock.info.and.callFake((data: any) => console.info(data));
    loggerMock.error.and.callFake((data: any) => console.error(data));

    snackBarMock.open.and.callFake((data: any) => console.log(data));
    sanitizerMock.bypassSecurityTrustResourceUrl.and.callFake((data: any) => console.log(data));
    activatedRouteMock.snapshot = {routeConfig: {path: '/expenses/restaurants'}};

    expenseRepositoryMock.getTopFrequentedStores.and.returnValue(of(topStoreExpenses));
    expenseRepositoryMock.getTopFrequentedRestaurants.and.returnValue(of(topRestaurantExpenses));
  })

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [TopExpensesComponent, DatePipe],
      providers: [
        {provide: NGXLogger, useValue: loggerMock},
        {provide: ExpenseRepository, useValue: expenseRepositoryMock},
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

  it('should create and load top 5 frequented restaurant', () => {
    expect(component).toBeTruthy();
    expect(component.isRestaurantComponent).toBeTruthy();
    expect(component.placeExpenses).toEqual(topRestaurantExpenses);
  });

  it('should create and load top 5 frequented stores', fakeAsync(() => {
    activatedRouteMock.snapshot = {routeConfig: {path: '/expenses/stores'}};
    buildComponent();
    expect(component.isRestaurantComponent).toBeFalse();
    expect(component.placeExpenses).toEqual(topStoreExpenses);
  }))

  it('should display error message if server responds with error', fakeAsync(() => {
    expenseRepositoryMock.getTopFrequentedRestaurants.and.returnValue(throwError({reason: 'error'}));
    buildComponent();
    expect(component.placeExpenses).toBeUndefined();
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(snackBarMock.open).toHaveBeenCalledTimes(1);
  }))
  function buildComponent() {
    fixture = TestBed.createComponent(TopExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function resetMockCalls() {
    snackBarMock.open.calls.reset();
  }
});


const topRestaurantExpenses: Expense[] = [
  {
    id: 7,
    name: 'saved restaurant expense',
    expenseLines: [],
    place: {
      id: 9,
      type: 'RESTAURANT',
      name: 'well known restaurant',
      address: {
        street: 'some street',
        zipCode: '0000',
        city: 'city',
        country: 'country'
      }
    }
  }
]

const topStoreExpenses: Expense[] = [
  {
    id: 6,
    name: 'saved store expense',
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
]
