import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../features/users').then((m) => m.USERS_ROUTES),
  },
];
