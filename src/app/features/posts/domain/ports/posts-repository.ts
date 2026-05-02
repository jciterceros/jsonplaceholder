import type { Observable } from 'rxjs';

import type { PostSummary } from '../entities/post.entity';

export abstract class PostsRepository {
  public abstract getPosts(): Observable<PostSummary[]>;
}
