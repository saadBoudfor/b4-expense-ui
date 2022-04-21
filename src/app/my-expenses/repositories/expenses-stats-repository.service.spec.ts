import { TestBed } from '@angular/core/testing';

import { ExpensesStatsRepository } from './expenses-stats-repository.service';

describe('ExpensesStatsRepositoryService', () => {
  let service: ExpensesStatsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesStatsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
