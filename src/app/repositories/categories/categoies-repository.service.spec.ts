import { TestBed } from '@angular/core/testing';

import { CategoriesRepository } from './categories-repository.service';

describe('CategoiesRepositoryService', () => {
  let service: CategoriesRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});