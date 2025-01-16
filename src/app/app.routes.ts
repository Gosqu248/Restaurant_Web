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
  {
    path: 'reset-password',
    loadComponent: () => import('./components/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
  },
  {
    path: 'add-menu',
    loadComponent: () => import('./components/admin/add-menu/add-menu.component').then(m => m.AddMenuComponent)
  }
];
