import { Component, inject } from '@angular/core';

import { PostsFacade } from '../../application/facades/posts.facade';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  templateUrl: './posts.page.html',
  styleUrl: './posts.page.css',
})
export class PostsPageComponent {
  private readonly facade = inject(PostsFacade);

  protected readonly postsResource = this.facade.postsResource;
  protected readonly title = this.facade.title;
  protected readonly searchTerm = this.facade.searchTerm;
  protected readonly currentPage = this.facade.currentPage;
  protected readonly errorMessage = this.facade.errorMessage;
  protected readonly posts = this.facade.posts;
  protected readonly filteredPosts = this.facade.filteredPosts;
  protected readonly totalPages = this.facade.totalPages;
  protected readonly pagedPosts = this.facade.pagedPosts;

  public reloadPosts(): void {
    this.facade.reloadPosts();
  }

  public onSearchTermChange(event: Event): void {
    this.facade.onSearchTermChange(event);
  }

  public goToPreviousPage(): void {
    this.facade.goToPreviousPage();
  }

  public goToNextPage(): void {
    this.facade.goToNextPage();
  }

  public cardImageUrl(postId: number): string {
    return `https://picsum.photos/seed/jsonp-posts-${postId}/480/280`;
  }

  public excerpt(body: string, maxLength = 140): string {
    const normalized = body.replace(/\s+/g, ' ').trim();
    if (normalized.length <= maxLength) {
      return normalized;
    }
    const slice = normalized.slice(0, maxLength);
    const lastSpace = slice.lastIndexOf(' ');
    const trimmed = lastSpace > 40 ? slice.slice(0, lastSpace) : slice;
    return `${trimmed}…`;
  }
}
