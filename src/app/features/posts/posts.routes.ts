import type { Routes } from '@angular/router';

import { PostsPageComponent } from './presentation/pages/posts.page';

export const POSTS_ROUTES: Routes = [
  {
    path: '',
    component: PostsPageComponent,
  },
];
