import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { AppThemeService } from './app-theme.service';
import { ThemePreferencesRepository } from './theme-preferences-repository';

describe('AppThemeService', () => {
  const themePreferencesMock = {
    readMode: vi.fn((): 'dark' | 'light' | null => null),
    saveMode: vi.fn(),
  };

  beforeEach(() => {
    document.documentElement.classList.remove('theme-dark', 'theme-light');
    themePreferencesMock.readMode.mockReturnValue(null);
    themePreferencesMock.saveMode.mockReset();
    TestBed.configureTestingModule({
      providers: [
        AppThemeService,
        { provide: ThemePreferencesRepository, useValue: themePreferencesMock },
      ],
    });
    const theme = TestBed.inject(AppThemeService);
    theme.mode.set('dark');
    (
      theme as unknown as {
        initialized: boolean;
      }
    ).initialized = false;
  });

  it('should initialize mode from theme preferences when available', () => {
    themePreferencesMock.readMode.mockReturnValue('light');
    const theme = TestBed.inject(AppThemeService);

    theme.init();

    expect(theme.mode()).toBe('light');
  });

  it('should persist next mode when toggling theme', () => {
    const theme = TestBed.inject(AppThemeService);
    expect(theme.mode()).toBe('dark');

    theme.toggle();

    expect(theme.mode()).toBe('light');
    expect(themePreferencesMock.saveMode).toHaveBeenCalledWith('light');
  });

  it('should sync theme-dark class on document element after init', () => {
    const theme = TestBed.inject(AppThemeService);
    const doc = TestBed.inject(DOCUMENT);
    theme.init();

    expect(doc.documentElement.classList.contains('theme-dark')).toBe(true);
    expect(doc.documentElement.classList.contains('theme-light')).toBe(false);
  });

  it('should sync theme-light class on document when preferences are light', () => {
    themePreferencesMock.readMode.mockReturnValue('light');
    const theme = TestBed.inject(AppThemeService);
    const doc = TestBed.inject(DOCUMENT);
    theme.init();

    expect(doc.documentElement.classList.contains('theme-light')).toBe(true);
    expect(doc.documentElement.classList.contains('theme-dark')).toBe(false);
  });

  it('should update document element class when toggling', () => {
    const theme = TestBed.inject(AppThemeService);
    const doc = TestBed.inject(DOCUMENT);
    theme.init();
    expect(doc.documentElement.classList.contains('theme-dark')).toBe(true);

    theme.toggle();

    expect(doc.documentElement.classList.contains('theme-light')).toBe(true);
    expect(doc.documentElement.classList.contains('theme-dark')).toBe(false);
  });
});
