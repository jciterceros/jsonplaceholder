import type { Observable } from 'rxjs';

import type { UserSummary } from '../models/user.model';

export interface UsersRepository {
  getUsers(): Observable<UserSummary[]>;
}
