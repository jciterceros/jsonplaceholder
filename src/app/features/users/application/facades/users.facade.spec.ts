import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { GetUsersUseCase } from '../use-cases/get-users.use-case';
import { UsersFacade } from './users.facade';

describe('UsersFacade', () => {
  const useCaseMock = {
    execute: () => of([]),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersFacade, { provide: GetUsersUseCase, useValue: useCaseMock }],
    });
  });

  it('should reset current page after updating search term', () => {
    const facade = TestBed.inject(UsersFacade);
    facade.currentPage.set(3);
    const input = document.createElement('input');
    input.value = 'Leanne';

    facade.onSearchTermChange({ target: input } as unknown as Event);

    expect(facade.searchTerm()).toBe('Leanne');
    expect(facade.currentPage()).toBe(1);
  });
});
