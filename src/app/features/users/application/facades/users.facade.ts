import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ApiError } from '../../../../core/errors/api-error';
import { UsersService } from '../../infrastructure/services/users.service';

const LOAD_USERS_ERROR_MESSAGE = 'Falha ao carregar usuarios. Tente novamente.';
const THEME_STORAGE_KEY = 'app-theme-mode';
const PAGE_SIZE = 6;

@Injectable({
  providedIn: 'root',
})
export class UsersFacade {
  private readonly usersService = inject(UsersService);

  /**
   * `params` must not be `undefined` or the resource stays `idle` and never runs the loader
   * (see Angular `ResourceImpl.loadEffect`). Use a stable sentinel; `reload()` still refetches.
   */
  public readonly usersResource = rxResource({
    params: () => null,
    stream: () => this.usersService.getUsers(),
  });

  public readonly title = signal('JSONPlaceholder Users');
  public readonly searchTerm = signal('');
  public readonly currentPage = signal(1);
  public readonly mode = signal<'dark' | 'light'>('dark');
  public readonly isDark = computed(() => this.mode() === 'dark');
  public readonly currentModeLabel = computed(() => (this.isDark() ? 'Dark' : 'Light'));
  public readonly nextModeLabel = computed(() => (this.isDark() ? 'Light' : 'Dark'));

  public readonly errorMessage = computed(() => {
    const err = this.usersResource.error();
    if (!err) {
      return null;
    }
    if (err instanceof ApiError) {
      return err.userMessage;
    }
    return LOAD_USERS_ERROR_MESSAGE;
  });

  public readonly users = computed(() => {
    if (!this.usersResource.hasValue()) {
      return [];
    }
    return this.usersResource.value() ?? [];
  });

  public readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.users();
    }

    return this.users().filter((user) => {
      const searchableContent = [user.name, user.username, user.email, user.city, user.companyName]
        .join(' ')
        .toLowerCase();
      return searchableContent.includes(term);
    });
  });
  public readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredUsers().length / PAGE_SIZE)),
  );
  public readonly pagedUsers = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const startIndex = (page - 1) * PAGE_SIZE;
    return this.filteredUsers().slice(startIndex, startIndex + PAGE_SIZE);
  });

  public constructor() {
    effect(() => {
      if (this.usersResource.status() === 'resolved' && this.usersResource.hasValue()) {
        this.currentPage.set(1);
      }
    });
  }

  public init(): void {
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedMode === 'dark' || savedMode === 'light') {
      this.mode.set(savedMode);
    }
  }

  public reloadUsers(): void {
    this.usersResource.reload();
  }

  public toggleMode(): void {
    this.mode.update((value) => (value === 'dark' ? 'light' : 'dark'));
    localStorage.setItem(THEME_STORAGE_KEY, this.mode());
  }

  public onSearchTermChange(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    this.searchTerm.set(target.value);
    this.currentPage.set(1);
  }

  public goToPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  public goToNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }
}
