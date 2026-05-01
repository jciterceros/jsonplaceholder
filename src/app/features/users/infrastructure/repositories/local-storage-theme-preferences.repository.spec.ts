import { LocalStorageThemePreferencesRepository } from './local-storage-theme-preferences.repository';

describe('LocalStorageThemePreferencesRepository', () => {
  const THEME_STORAGE_KEY = 'app-theme-mode';
  let repository: LocalStorageThemePreferencesRepository;

  beforeEach(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
    repository = new LocalStorageThemePreferencesRepository();
  });

  afterEach(() => {
    localStorage.removeItem(THEME_STORAGE_KEY);
  });

  it('should return null when there is no persisted mode', () => {
    expect(repository.readMode()).toBeNull();
  });

  it('should persist and read dark mode', () => {
    repository.saveMode('dark');

    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
    expect(repository.readMode()).toBe('dark');
  });

  it('should ignore unsupported values in storage', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'unsupported');

    expect(repository.readMode()).toBeNull();
  });
});
