import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import type { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import type { UserApiItem, UserSummary } from '../../domain/entities/user.entity';
import type { UsersRepository } from '../../domain/ports/users-repository';
import { mapUserApiItemToSummary } from '../mappers/user.mapper';

const USERS_ENDPOINT = `${environment.apiBaseUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class UsersService implements UsersRepository {
  private readonly http = inject(HttpClient);

  public getUsers(): Observable<UserSummary[]> {
    return this.http
      .get<UserApiItem[]>(USERS_ENDPOINT)
      .pipe(map((users) => users.map(mapUserApiItemToSummary)));
  }
}
