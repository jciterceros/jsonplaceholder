import type { Routes } from '@angular/router';

import { UsersPageComponent } from './presentation/pages/users.page';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UsersPageComponent,
  },
];
