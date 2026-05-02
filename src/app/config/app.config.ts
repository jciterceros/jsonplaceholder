import { provideBrowserGlobalErrorListeners } from '@angular/core';
import type { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { httpErrorInterceptor } from '../core/http/interceptors/http-error.interceptor';
import { PostsRepository } from '../features/posts/domain/ports/posts-repository';
import { PostsService } from '../features/posts/infrastructure/services/posts.service';
import { LocalStorageThemePreferencesRepository } from '../core/theme/local-storage-theme-preferences.repository';
import { ThemePreferencesRepository } from '../core/theme/theme-preferences-repository';
import { UsersRepository } from '../features/users/domain/ports/users-repository';
import { UsersService } from '../features/users/infrastructure/services/users.service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      }),
    ),
    { provide: PostsRepository, useExisting: PostsService },
    { provide: UsersRepository, useExisting: UsersService },
    { provide: ThemePreferencesRepository, useExisting: LocalStorageThemePreferencesRepository },
  ],
};
