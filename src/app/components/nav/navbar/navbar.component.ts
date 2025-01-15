import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {UserMenuMainComponent} from '../../user-menu/user-menu-main/user-menu-main.component';

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  isAuth: boolean = false;

  constructor(protected authService: AuthService,
              private dialog: MatDialog) {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuth = isAuth;
      console.log('isAuth', isAuth);
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openMenuDialog() {
    this.dialog.open(UserMenuMainComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'centered-dialog',
      disableClose: false,
      autoFocus: true,

    })
  }
}
