import { Component, HostBinding, computed, effect, inject, signal } from '@angular/core';
import type { OnInit } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ApiError } from '../data/errors/api-error';
import { UsersService } from '../data/services/users.service';
import type { UserSummary } from '../domain/models/user.model';
import { ThemeToggleComponent } from './components/theme-toggle.component';
import { UserCardComponent } from './components/user-card.component';

const LOAD_USERS_ERROR_MESSAGE = 'Falha ao carregar usuarios. Tente novamente.';
const THEME_STORAGE_KEY = 'app-theme-mode';
const PAGE_SIZE = 6;

@Component({
  imports: [ThemeToggleComponent, UserCardComponent],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  private readonly usersService = inject(UsersService);

  /**
   * `params` must not be `undefined` or the resource stays `idle` and never runs the loader
   * (see Angular `ResourceImpl.loadEffect`). Use a stable sentinel; `reload()` still refetches.
   */
  protected readonly usersResource = rxResource({
    params: () => null,
    stream: () => this.usersService.getUsers(),
  });

  protected readonly title = signal('JSONPlaceholder Users');
  protected readonly searchTerm = signal('');
  protected readonly currentPage = signal(1);
  protected readonly mode = signal<'dark' | 'light'>('dark');
  protected readonly isDark = computed(() => this.mode() === 'dark');
  protected readonly currentModeLabel = computed(() => (this.isDark() ? 'Dark' : 'Light'));
  protected readonly nextModeLabel = computed(() => (this.isDark() ? 'Light' : 'Dark'));

  protected readonly errorMessage = computed(() => {
    const err = this.usersResource.error();
    if (!err) {
      return null;
    }
    if (err instanceof ApiError) {
      return err.userMessage;
    }
    return LOAD_USERS_ERROR_MESSAGE;
  });

  protected readonly users = computed(() => {
    if (!this.usersResource.hasValue()) {
      return [];
    }
    return this.usersResource.value() ?? [];
  });

  protected readonly filteredUsers = computed(() => {
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
  protected readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredUsers().length / PAGE_SIZE)),
  );
  protected readonly pagedUsers = computed(() => {
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

  @HostBinding('class.theme-dark')
  public get isDarkThemeClass(): boolean {
    return this.isDark();
  }

  @HostBinding('class.theme-light')
  public get isLightThemeClass(): boolean {
    return !this.isDark();
  }

  public ngOnInit(): void {
    this.restoreThemeMode();
  }

  public reloadUsers(): void {
    this.usersResource.reload();
  }

  public toggleMode(): void {
    this.mode.update((value) => (value === 'dark' ? 'light' : 'dark'));
    this.persistThemeMode();
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

  private restoreThemeMode(): void {
    const savedMode = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedMode === 'dark' || savedMode === 'light') {
      this.mode.set(savedMode);
    }
  }

  private persistThemeMode(): void {
    localStorage.setItem(THEME_STORAGE_KEY, this.mode());
  }
}
