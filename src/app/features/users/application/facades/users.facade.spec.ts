import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { ThemePreferencesRepository } from '../../domain/ports/theme-preferences-repository';
import { GetUsersUseCase } from '../use-cases/get-users.use-case';
import { UsersFacade } from './users.facade';

describe('UsersFacade', () => {
  const useCaseMock = {
    execute: () => of([]),
  };

  const themePreferencesMock = {
    readMode: (): 'dark' | 'light' | null => null,
    saveMode: (_mode: 'dark' | 'light') => undefined,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersFacade,
        { provide: GetUsersUseCase, useValue: useCaseMock },
        { provide: ThemePreferencesRepository, useValue: themePreferencesMock },
      ],
    });
  });

  it('should initialize mode from theme preferences when available', () => {
    vi.spyOn(themePreferencesMock, 'readMode').mockReturnValue('light');
    const facade = TestBed.inject(UsersFacade);

    facade.init();

    expect(facade.mode()).toBe('light');
  });

  it('should persist next mode when toggling theme', () => {
    vi.spyOn(themePreferencesMock, 'saveMode');
    const facade = TestBed.inject(UsersFacade);
    expect(facade.mode()).toBe('dark');

    facade.toggleMode();

    expect(facade.mode()).toBe('light');
    expect(themePreferencesMock.saveMode).toHaveBeenCalledWith('light');
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
