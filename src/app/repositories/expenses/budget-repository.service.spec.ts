import {fakeAsync} from '@angular/core/testing';

import {BudgetRepositoryService} from './budget-repository.service';
import {of} from "rxjs";

fdescribe('BudgetRepositoryService', () => {
  let service: BudgetRepositoryService;
  let httpClientMock: any;
  let loggerMock: any;

  beforeEach(() => {
    httpClientMock = jasmine.createSpyObj(['put']);
    loggerMock = jasmine.createSpyObj(['info', 'debug', 'warn', 'error']);
  })

  it('should be created', () => {
    service = new BudgetRepositoryService(httpClientMock, loggerMock);
    expect(service).toBeTruthy();
  });

  it('should update budget success', fakeAsync(() => {
    // Given
    httpClientMock.put.and.returnValue(of({id: 2, user: {id: 1}, target: 250} as any));
    loggerMock.info.and.callFake((data: any) => console.log(data))
    service = new BudgetRepositoryService(httpClientMock, loggerMock);

    // When - Then
    service.updateBudget(250).subscribe(budget => {
      expect(budget.id).toEqual(2);
      expect(loggerMock.info).toHaveBeenCalledTimes(1);
    })
  }))

});
