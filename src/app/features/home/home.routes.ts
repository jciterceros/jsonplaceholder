import type { Routes } from '@angular/router';

import { HomePageComponent } from './presentation/pages/home.page';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];
