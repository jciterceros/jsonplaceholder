import { Component, HostBinding, inject } from '@angular/core';
import type { OnInit } from '@angular/core';
import { ThemeToggleComponent } from '../../../../presentation/components/theme-toggle.component';
import { UsersFacade } from '../../application/facades/users.facade';
import { UserCardComponent } from '../components/user-card.component';

@Component({
  imports: [ThemeToggleComponent, UserCardComponent],
  selector: 'app-users-page',
  standalone: true,
  templateUrl: './users.page.html',
  styleUrl: './users.page.css',
})
export class UsersPageComponent implements OnInit {
  private readonly facade = inject(UsersFacade);

  protected readonly usersResource = this.facade.usersResource;
  protected readonly title = this.facade.title;
  protected readonly searchTerm = this.facade.searchTerm;
  protected readonly currentPage = this.facade.currentPage;
  protected readonly isDark = this.facade.isDark;
  protected readonly currentModeLabel = this.facade.currentModeLabel;
  protected readonly nextModeLabel = this.facade.nextModeLabel;
  protected readonly errorMessage = this.facade.errorMessage;
  protected readonly users = this.facade.users;
  protected readonly filteredUsers = this.facade.filteredUsers;
  protected readonly totalPages = this.facade.totalPages;
  protected readonly pagedUsers = this.facade.pagedUsers;

  @HostBinding('class.theme-dark')
  public get isDarkThemeClass(): boolean {
    return this.isDark();
  }

  @HostBinding('class.theme-light')
  public get isLightThemeClass(): boolean {
    return !this.isDark();
  }

  public ngOnInit(): void {
    this.facade.init();
  }

  public reloadUsers(): void {
    this.facade.reloadUsers();
  }

  public toggleMode(): void {
    this.facade.toggleMode();
  }

  public onSearchTermChange(event: Event): void {
    this.facade.onSearchTermChange(event);
  }

  public goToPreviousPage(): void {
    this.facade.goToPreviousPage();
  }

  public goToNextPage(): void {
    this.facade.goToNextPage();
  }
}
