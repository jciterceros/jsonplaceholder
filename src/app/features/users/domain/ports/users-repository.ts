import type { Observable } from 'rxjs';

import type { UserSummary } from '../entities/user.entity';

export abstract class UsersRepository {
  public abstract getUsers(): Observable<UserSummary[]>;
}
