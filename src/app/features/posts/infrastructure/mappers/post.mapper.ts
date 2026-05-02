import type { PostSummary } from '../../domain/entities/post.entity';
import type { PostApiItemDto } from '../api/post-api-item.dto';

export function mapPostApiItemToSummary(post: PostApiItemDto): PostSummary {
  return {
    userId: post.userId,
    id: post.id,
    title: post.title,
    body: post.body,
  };
}
