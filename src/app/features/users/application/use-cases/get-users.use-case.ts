import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';

import type { UserSummary } from '../../domain/models/user.model';
import type { UsersRepository } from '../../domain/ports/users-repository';
import { UsersService } from '../../infrastructure/services/users.service';

@Injectable({
  providedIn: 'root',
})
export class GetUsersUseCase {
  private readonly usersRepository: UsersRepository = inject(UsersService);

  public execute(): Observable<UserSummary[]> {
    return this.usersRepository.getUsers();
  }
}
