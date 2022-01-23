
import { ExpenseRepository } from './expense-repository.service';

describe('ExpenseService', () => {
  let service: ExpenseRepository;
  const httpClientMock = jasmine.createSpyObj(['get', 'put', 'post', 'delete']);
  const loggerMock = jasmine.createSpyObj(['info']);

});
