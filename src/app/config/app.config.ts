import { provideBrowserGlobalErrorListeners } from '@angular/core';
import type { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { httpErrorInterceptor } from '../core/http/interceptors/http-error.interceptor';
import { ThemePreferencesRepository } from '../features/users/domain/ports/theme-preferences-repository';
import { UsersRepository } from '../features/users/domain/ports/users-repository';
import { LocalStorageThemePreferencesRepository } from '../features/users/infrastructure/repositories/local-storage-theme-preferences.repository';
import { UsersService } from '../features/users/infrastructure/services/users.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideRouter(routes),
    { provide: UsersRepository, useExisting: UsersService },
    { provide: ThemePreferencesRepository, useExisting: LocalStorageThemePreferencesRepository },
  ],
};
