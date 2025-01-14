import { Routes } from '@angular/router';
import {HomeMainComponent} from './components/home/home-main/home-main.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeMainComponent
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login-main/login-main.component').then(m => m.LoginMainComponent)
  }
];
