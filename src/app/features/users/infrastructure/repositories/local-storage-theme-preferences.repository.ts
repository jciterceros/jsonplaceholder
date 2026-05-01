import { Injectable } from '@angular/core';

import type {
  ThemeMode,
  ThemePreferencesRepository,
} from '../../domain/ports/theme-preferences-repository';

const THEME_STORAGE_KEY = 'app-theme-mode';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageThemePreferencesRepository implements ThemePreferencesRepository {
  public readMode(): ThemeMode | null {
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedMode === 'dark' || savedMode === 'light') {
      return savedMode;
    }
    return null;
  }

  public saveMode(mode: ThemeMode): void {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  }
}
