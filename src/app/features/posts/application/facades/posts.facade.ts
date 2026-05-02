import { Injectable, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { ApiError } from '../../../../core/errors/api-error';
import { GetPostsUseCase } from '../use-cases/get-posts.use-case';

const LOAD_POSTS_ERROR_MESSAGE = 'Falha ao carregar posts. Tente novamente.';
const PAGE_SIZE = 10;

@Injectable({
  providedIn: 'root',
})
export class PostsFacade {
  private readonly getPostsUseCase = inject(GetPostsUseCase);

  public readonly postsResource = rxResource({
    params: () => null,
    stream: () => this.getPostsUseCase.execute(),
  });

  public readonly title = signal('JSONPlaceholder Posts');
  public readonly searchTerm = signal('');
  public readonly currentPage = signal(1);

  public readonly errorMessage = computed(() => {
    const err = this.postsResource.error();
    if (!err) {
      return null;
    }
    if (err instanceof ApiError) {
      return err.userMessage;
    }
    return LOAD_POSTS_ERROR_MESSAGE;
  });

  public readonly posts = computed(() => {
    if (!this.postsResource.hasValue()) {
      return [];
    }
    return this.postsResource.value() ?? [];
  });

  public readonly filteredPosts = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) {
      return this.posts();
    }
    return this.posts().filter((post) => {
      const searchableContent = `${post.title} ${post.body}`.toLowerCase();
      return searchableContent.includes(term);
    });
  });

  public readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredPosts().length / PAGE_SIZE)),
  );

  public readonly pagedPosts = computed(() => {
    const page = Math.min(this.currentPage(), this.totalPages());
    const startIndex = (page - 1) * PAGE_SIZE;
    return this.filteredPosts().slice(startIndex, startIndex + PAGE_SIZE);
  });

  public reloadPosts(): void {
    this.postsResource.reload();
  }

  public onSearchTermChange(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    this.searchTerm.set(target.value);
    this.currentPage.set(1);
  }

  public goToPreviousPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((page) => page - 1);
    }
  }

  public goToNextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((page) => page + 1);
    }
  }
}
