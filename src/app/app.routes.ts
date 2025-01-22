import { Routes } from '@angular/router';
import {HomeMainComponent} from './components/home/home-main/home-main.component';
import {adminGuard} from './guards/admin.guard';

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
    path: 'menu',
    loadComponent: () => import('./components/menu/menu-main/menu-main.component').then(m => m.MenuMainComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/order/order-main/order-main.component').then(m => m.OrderMainComponent)
  },
  {
    path: 'orders-history',
    loadComponent: () => import('./components/user-orders/history/order-history-main/order-history-main.component').then(m => m.OrderHistoryMainComponent)
  },
  {
    path: 'payment-confirmation',
    loadComponent: () => import('./components/payment-confirmation/payment-confirmation.component').then(m => m.PaymentConfirmationComponent)
  },
  {
    path: 'add-menu',
    loadComponent: () => import('./components/admin/add-menu/add-menu.component').then(m => m.AddMenuComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'order-monitoring',
    loadComponent: () => import('./components/admin/order-monitoring/order-monitoring-main/order-monitoring-main.component').then(m => m.OrderMonitoringMainComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'all-menus',
    loadComponent: () => import('./components/admin/all-menus/all-menus-main/all-menus-main.component').then(m => m.AllMenusMainComponent),
    canActivate: [adminGuard]
  }
];
