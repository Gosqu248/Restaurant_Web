import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuth()) {
    router.navigate(['/']);
    return false;
  } else {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      router.navigate(['/']);
      return false
    } else {
      return true;
    }
  }
};
