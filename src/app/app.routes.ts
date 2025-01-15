import { Routes } from '@angular/router';
import {HomeMainComponent} from './components/home/home-main/home-main.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeMainComponent
  },
  {
    path: 'auth',
    loadComponent: () => import('./components/auth/auth-main/auth-main.component').then(m => m.AuthMainComponent)
  },
];
