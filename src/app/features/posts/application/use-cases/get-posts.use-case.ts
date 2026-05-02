import { Injectable, inject } from '@angular/core';
import type { Observable } from 'rxjs';

import type { PostSummary } from '../../domain/entities/post.entity';
import { PostsRepository } from '../../domain/ports/posts-repository';

@Injectable({
  providedIn: 'root',
})
export class GetPostsUseCase {
  private readonly postsRepository = inject(PostsRepository);

  public execute(): Observable<PostSummary[]> {
    return this.postsRepository.getPosts();
  }
}
