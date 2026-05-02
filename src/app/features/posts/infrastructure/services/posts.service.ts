import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import type { Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import type { PostSummary } from '../../domain/entities/post.entity';
import type { PostsRepository } from '../../domain/ports/posts-repository';
import type { PostApiItemDto } from '../api/post-api-item.dto';
import { mapPostApiItemToSummary } from '../mappers/post.mapper';

const POSTS_ENDPOINT = `${environment.apiBaseUrl}/posts`;

@Injectable({
  providedIn: 'root',
})
export class PostsService implements PostsRepository {
  private readonly http = inject(HttpClient);

  public getPosts(): Observable<PostSummary[]> {
    return this.http
      .get<PostApiItemDto[]>(POSTS_ENDPOINT)
      .pipe(map((posts) => posts.map(mapPostApiItemToSummary)));
  }
}
