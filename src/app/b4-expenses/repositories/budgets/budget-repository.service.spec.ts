import {BudgetRepository} from './budget-repository.service';
import {of} from "rxjs";

describe('BudgetService', () => {
  let service: BudgetRepository;
  const httpClientMock = jasmine.createSpyObj(['get', 'put']);
  const loggerMock = jasmine.createSpyObj(['info']);
  const DEFINED_BUDGET = {
    id: 4,
    date: '2022-01-01',
    target: 456.5,
    user: {
      id: 1,
      name: 'smith',
      lastname: 'smith',
      firstname: 'william',
      email: 'smith.william@email.com',
      username: 'wsmith'
    }
  };


  it('should get display-budget for given user success', () => {
    // Given
    httpClientMock.get.and.returnValue(of(DEFINED_BUDGET));
    loggerMock.info.and.callFake((data: any) => console.log(data))

    // When
    service = new BudgetRepository(httpClientMock, loggerMock);

    // Then
    service.getByUserId(1).subscribe(budget => expect(budget).toEqual(DEFINED_BUDGET))
  })

  it('should define new display-budget success', () => {

    // Given
    httpClientMock.put.and.returnValue(of(DEFINED_BUDGET));
    loggerMock.info.and.callFake((data: any) => console.log(data))

    // When
    service = new BudgetRepository(httpClientMock, loggerMock);

    // Then
    service.save(50.6 + '', 1).subscribe(budget => expect(budget).toEqual(DEFINED_BUDGET))
  })


});
