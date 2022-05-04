import { TestBed } from '@angular/core/testing';

import { BudgetRepositoryService } from './budget-repository.service';

describe('BudgetRepositoryService', () => {
  let service: BudgetRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
