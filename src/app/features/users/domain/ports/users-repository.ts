import type { Observable } from 'rxjs';

import type { UserSummary } from '../entities/user.entity';

export interface UsersRepository {
  getUsers(): Observable<UserSummary[]>;
}
