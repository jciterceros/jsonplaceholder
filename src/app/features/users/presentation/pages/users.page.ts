import { Component, inject } from '@angular/core';

import { UsersFacade } from '../../application/facades/users.facade';
import { UserCardComponent } from '../components/user-card.component';

@Component({
  imports: [UserCardComponent],
  selector: 'app-users-page',
  standalone: true,
  templateUrl: './users.page.html',
  styleUrl: './users.page.css',
})
export class UsersPageComponent {
  private readonly facade = inject(UsersFacade);

  protected readonly usersResource = this.facade.usersResource;
  protected readonly searchTerm = this.facade.searchTerm;
  protected readonly currentPage = this.facade.currentPage;
  protected readonly errorMessage = this.facade.errorMessage;
  protected readonly users = this.facade.users;
  protected readonly filteredUsers = this.facade.filteredUsers;
  protected readonly totalPages = this.facade.totalPages;
  protected readonly pagedUsers = this.facade.pagedUsers;

  public reloadUsers(): void {
    this.facade.reloadUsers();
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
