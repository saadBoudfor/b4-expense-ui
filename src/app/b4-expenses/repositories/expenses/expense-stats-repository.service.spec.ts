import { TestBed } from '@angular/core/testing';

import { ExpenseStatsRepository } from './expense-stats-repository.service';

describe('ExpenseStatsRepositoryService', () => {
  let service: ExpenseStatsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseStatsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
