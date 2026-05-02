import { DOCUMENT } from '@angular/common';
import { Injectable, computed, inject, signal } from '@angular/core';

import type { ThemeMode } from './theme-preferences-repository';
import { ThemePreferencesRepository } from './theme-preferences-repository';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly themePreferences = inject(ThemePreferencesRepository);
  private initialized = false;

  public readonly mode = signal<ThemeMode>('dark');
  public readonly isDark = computed(() => this.mode() === 'dark');
  public readonly isLight = computed(() => this.mode() === 'light');
  public readonly currentModeLabel = computed(() => (this.isDark() ? 'Dark' : 'Light'));
  public readonly nextModeLabel = computed(() => (this.isDark() ? 'Light' : 'Dark'));

  public init(): void {
    if (!this.initialized) {
      this.initialized = true;
      const savedMode = this.themePreferences.readMode();
      if (savedMode) {
        this.mode.set(savedMode);
      }
    }
    this.syncRootThemeClass();
  }

  public toggle(): void {
    this.mode.update((value) => (value === 'dark' ? 'light' : 'dark'));
    this.themePreferences.saveMode(this.mode());
    this.syncRootThemeClass();
  }

  private syncRootThemeClass(): void {
    const root = this.document.documentElement;
    if (!root?.classList) {
      return;
    }
    root.classList.remove('theme-dark', 'theme-light');
    root.classList.add(this.mode() === 'dark' ? 'theme-dark' : 'theme-light');
  }
}
