import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {UserMenuFavouriteComponent} from '../user-menu-favourite/user-menu-favourite.component';
import {UserMenuAddressComponent} from '../address/user-menu-address/user-menu-address.component';
import {UserMenuProfileComponent} from '../user-menu-profile/user-menu-profile.component';
import {UserDTO} from '../../../interfaces/user';

@Component({
  selector: 'app-user-menu-main',
  imports: [
    NgIf
  ],
  templateUrl: './user-menu-main.component.html',
  standalone: true,
  styleUrl: './user-menu-main.component.scss'
})
export class UserMenuMainComponent implements OnInit{
  role: string = '';
  name: string = '';
  userData: UserDTO | null = null;

  constructor(protected authService: AuthService,
              private dialog: MatDialog,
              private router: Router,
              public dialogRef: MatDialogRef<UserMenuMainComponent>) {}

  ngOnInit() {
    this.authService.userData$.subscribe(userData => {
      this.userData = userData;
    });
  }

  logout() {
    this.authService.logout();
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  openMenuProfileDialog() {
    this.closeDialog();
      this.dialog.open(UserMenuProfileComponent, {
        width: 'auto',
        maxWidth: '100%',
        height: 'auto',
      });
  }

  openAddressesDialog() {
    this.closeDialog();
      this.dialog.open(UserMenuAddressComponent, {
        width: 'auto',
        maxWidth: '100%',
        height: 'auto',
      });
  }

  openFavoritesDialog() {
    this.closeDialog();
    this.dialog.open(UserMenuFavouriteComponent, {
      width: 'auto',
      maxWidth: '100%',
      height: 'auto',
    });
  }

  goToOrderHistory() {
    this.dialog.closeAll();
    this.router.navigate(['/orders-history']);
  }

  goToOrderMonitor() {
    this.dialog.closeAll();
    this.router.navigate(['/order-monitoring']);
  }

  goToAddMenu() {
    this.dialog.closeAll();
    this.router.navigate(['/add-menu']);
  }
}
