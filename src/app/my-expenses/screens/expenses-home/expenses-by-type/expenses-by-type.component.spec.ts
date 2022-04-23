import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ExpensesByTypeComponent} from './expenses-by-type.component';
import {ExpensesStatsRepository} from "../../../repositories/expenses-stats-repository.service";
import {NGXLogger} from "ngx-logger";
import {of, throwError} from "rxjs";

fdescribe('ExpensesByTypeComponent', () => {
  let component: ExpensesByTypeComponent;
  let fixture: ComponentFixture<ExpensesByTypeComponent>;

  let expenseStatsRepositoryMock = jasmine.createSpyObj(['getRestaurants', 'getStores']);
  let loggerMock = jasmine.createSpyObj(['info', 'error']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpensesByTypeComponent],
      providers: [
        {provide: ExpensesStatsRepository, useValue: expenseStatsRepositoryMock},
        {provide: NGXLogger, useValue: loggerMock}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    expenseStatsRepositoryMock.getRestaurants.and.returnValue(of({total: 4}))
    expenseStatsRepositoryMock.getStores.and.returnValue(of({total: 6}))
    fixture = TestBed.createComponent(ExpensesByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load restaurants and stores stats', () => {
    expect(component.restaurantStats.total).toBe(4);
    expect(component.storesStats.total).toBe(6);
    expect(component.percentageStores).toBe(60);
    expect(component.percentageRestaurant).toBe(40);
  })

  it('should set error flag to true if failed to load data', () => {
    expenseStatsRepositoryMock.getRestaurants.and.returnValue(throwError({error: 'some error'}))
    fixture = TestBed.createComponent(ExpensesByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.error).toBeTrue();
  })
});
