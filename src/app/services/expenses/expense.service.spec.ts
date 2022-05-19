
import { ExpenseService } from './expense.service';
import {Expense} from "../../data-model/expenses/Expense";

fdescribe('ExpenseService', () => {
  let service: ExpenseService;
  const loggerMock = jasmine.createSpyObj(['debug', 'error']);
  const httpClientMock = jasmine.createSpyObj(['get', 'post']);

  beforeEach(()=> {
    loggerMock.debug.and.callFake((data:any) => console.debug(data));
    loggerMock.error.and.callFake((data:any) => console.debug(data));
    httpClientMock.post.and.callFake((data:any) => console.debug(data));
    httpClientMock.get.and.callFake((data:any) => console.debug(data));
    loggerMock.debug.calls.reset();

    httpClientMock.get.calls.reset();
    httpClientMock.post.calls.reset();

    localStorage.removeItem('bill');
    localStorage.removeItem('draft_expense');
  })


  it('should create new draft success', () => {
      service = new ExpenseService(loggerMock, httpClientMock);

      service.createNewDraft(expense);

      const savedDraft = localStorage.getItem('draft_expense');
      expect(savedDraft).toBeTruthy();
      expect(JSON.parse(savedDraft ?  savedDraft: '')).toEqual(expense);
  });

  it('should clear cache success', () => {
    service = new ExpenseService(loggerMock, httpClientMock);

    service.clear();

    expect(localStorage.getItem('draft_expense')).toBeFalsy();
    expect(localStorage.getItem('bill')).toBeFalsy();
  })

  it('should update draft success', () => {
    service = new ExpenseService(loggerMock, httpClientMock);

    service.updateDraft(expense);

    const savedDraft = localStorage.getItem('draft_expense');
    expect(savedDraft).toBeTruthy();
    expect(JSON.parse(savedDraft ?  savedDraft: '')).toEqual(expense);
  });

  it('should update bill success', () => {
    service = new ExpenseService(loggerMock, httpClientMock);

    service.updateBill( 'file');

    const savedDraft = localStorage.getItem('bill');
    expect(savedDraft).toBeTruthy();
    expect(JSON.parse(savedDraft ?  savedDraft: '')).toEqual('file');
  });

  it('should get draft success', () => {
    service = new ExpenseService(loggerMock, httpClientMock);
    localStorage.setItem('draft_expense', JSON.stringify(expense));

    const saved = service.getCurrentDraft();
    expect(saved).toEqual(expense);
  })

  it('should save expense in db using save function success', () => {
    service = new ExpenseService(loggerMock, httpClientMock);
    service.createNewDraft(expense);

    service.save(expense, null);

    expect(httpClientMock.post).toHaveBeenCalledTimes(1);
  })

  it('should save expense in db using validate expense success', () => {
    service = new ExpenseService(loggerMock, httpClientMock);
    service.createNewDraft(expense);

    service.validateExpense();

    expect(httpClientMock.post).toHaveBeenCalledTimes(1);
  })

  it('should save expense in db using createAndSave expense success', () => {
    service = new ExpenseService(loggerMock, httpClientMock);

    service.createAndSave(expense);

    expect(httpClientMock.post).toHaveBeenCalledTimes(1);
  })
});

const expense: Expense = {
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
