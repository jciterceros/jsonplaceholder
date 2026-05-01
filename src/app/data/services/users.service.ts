import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import type { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { mapUserApiItemToSummary } from '../../domain/mappers/user.mapper';
import type { UserApiItem, UserSummary } from '../../domain/models/user.model';

const USERS_ENDPOINT = `${environment.apiBaseUrl}/users`;

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly http = inject(HttpClient);

  public getUsers(): Observable<UserSummary[]> {
    return this.http
      .get<UserApiItem[]>(USERS_ENDPOINT)
      .pipe(map((users) => users.map(mapUserApiItemToSummary)));
  }
}
