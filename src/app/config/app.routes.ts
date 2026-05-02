import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/home').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'posts',
    loadChildren: () => import('../features/posts').then((m) => m.POSTS_ROUTES),
  },
  {
    path: 'comments',
    loadComponent: () =>
      import('../shared/presentation/pages/resource-stub.page').then((m) => m.ResourceStubPageComponent),
    data: { title: 'Comentários' },
  },
  {
    path: 'albums',
    loadComponent: () =>
      import('../shared/presentation/pages/resource-stub.page').then((m) => m.ResourceStubPageComponent),
    data: { title: 'Álbuns' },
  },
  {
    path: 'photos',
    loadComponent: () =>
      import('../shared/presentation/pages/resource-stub.page').then((m) => m.ResourceStubPageComponent),
    data: { title: 'Fotos' },
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('../shared/presentation/pages/resource-stub.page').then((m) => m.ResourceStubPageComponent),
    data: { title: 'Tarefas' },
  },
  {
    path: 'users',
    loadChildren: () => import('../features/users').then((m) => m.USERS_ROUTES),
  },
];
