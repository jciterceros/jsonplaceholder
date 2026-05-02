export type ThemeMode = 'dark' | 'light';

export abstract class ThemePreferencesRepository {
  public abstract readMode(): ThemeMode | null;
  public abstract saveMode(mode: ThemeMode): void;
}
