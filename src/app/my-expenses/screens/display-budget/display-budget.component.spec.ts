import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {DisplayBudgetComponent} from './display-budget.component';
import {TranslateModule} from "@ngx-translate/core";
import {NGXLogger} from "ngx-logger";
import {ExpenseService} from "../../services/expense.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {ExpenseBasicStats} from "../../models/ExpenseBasicStats";
import {HttpClientModule} from "@angular/common/http";
import {ExpenseRepository} from "../../repositories/expense-repository.service";
import {of} from "rxjs";

fdescribe('DisplayBudgetComponent', () => {
  let component: DisplayBudgetComponent;
  let fixture: ComponentFixture<DisplayBudgetComponent>;
  // create mocks
  let expenseRepositoryMock: any;
  let loggerMock: any;

  beforeEach(() => {
    expenseRepositoryMock = jasmine.createSpyObj(['getStats']);
    loggerMock = jasmine.createSpyObj(['info']);

    loggerMock.info.and.callFake((data: any) => console.info(data));
    expenseRepositoryMock.getStats.and.returnValue(of(states))

  })
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [DisplayBudgetComponent],
      providers: [
        {provide: NGXLogger, useValue: loggerMock},
        {provide: ExpenseRepository, useValue: expenseRepositoryMock}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();

    tick();

    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(component.state).toEqual(states)
  }));
});

const states = {
  target: 9,
  total: 5,
  count: 8.6,
  countForCurrentWeek: 89,
  totalForCurrentWeek: 89
} as ExpenseBasicStats;
