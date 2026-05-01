import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';

import type { UserSummary } from '../../domain/entities/user.entity';
import { UsersRepository } from '../../domain/ports/users-repository';

@Injectable({
  providedIn: 'root',
})
export class GetUsersUseCase {
  private readonly usersRepository = inject(UsersRepository);

  public execute(): Observable<UserSummary[]> {
    return this.usersRepository.getUsers();
  }
}
