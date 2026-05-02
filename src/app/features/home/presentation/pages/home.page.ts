import { Component, HostBinding, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';

import { ApiError } from '../../../../core/errors/api-error';
import { GetPostsUseCase } from '../../../posts/application/use-cases/get-posts.use-case';

const LOAD_ERROR_MESSAGE = 'Falha ao carregar conteúdo. Tente novamente.';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePageComponent {
  private readonly getPostsUseCase = inject(GetPostsUseCase);

  @HostBinding('class.home-layout')
  protected readonly homeLayoutClass = true;

  public readonly postsResource = rxResource({
    params: () => null,
    stream: () => this.getPostsUseCase.execute(),
  });

  public readonly searchTerm = signal('');

  public readonly errorMessage = computed(() => {
    const err = this.postsResource.error();
    if (!err) {
      return null;
    }
    if (err instanceof ApiError) {
      return err.userMessage;
    }
    return LOAD_ERROR_MESSAGE;
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

  public readonly featuredPost = computed(() => {
    const list = this.filteredPosts();
    return list[0] ?? null;
  });

  public readonly gridPosts = computed(() => this.filteredPosts().slice(1));

  public reload(): void {
    this.postsResource.reload();
  }

  public onSearchTermChange(event: Event): void {
    const target = event.target;
    if (!(target instanceof HTMLInputElement)) {
      return;
    }
    this.searchTerm.set(target.value);
  }

  public heroImageUrl(postId: number): string {
    return `https://picsum.photos/seed/jsonp-hero-${postId}/720/540`;
  }

  public cardImageUrl(postId: number): string {
    return `https://picsum.photos/seed/jsonp-card-${postId}/480/280`;
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
