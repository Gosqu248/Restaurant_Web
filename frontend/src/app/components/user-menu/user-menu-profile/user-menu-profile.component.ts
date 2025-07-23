import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AuthService} from '../../../services/auth.service';
import {NgIf} from '@angular/common';
import {UserMenuMainComponent} from '../user-menu-main/user-menu-main.component';
import {UserMenuChangePasswordComponent} from '../user-menu-change-password/user-menu-change-password.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-menu-profile',
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './user-menu-profile.component.html',
  standalone: true,
  styleUrl: './user-menu-profile.component.scss'
})
export class UserMenuProfileComponent implements OnInit{
  name: string = '';
  originalName: string = this.name;
  phoneNumber: string = '';
  originalPhoneNumber: string = this.phoneNumber;
  isDataChanged: boolean = false;
  email: string = '';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UserMenuProfileComponent>,
  ) {}

  ngOnInit() {
    this.authService.userData$.subscribe(userData => {
      this.name = userData?.name || '';
      this.email = userData?.email || '';
      this.phoneNumber = userData?.phoneNumber || '';
    });
  }

  showButton() {
    this.isDataChanged = (this.name !== this.originalName && this.name.length > 0) || (this.phoneNumber !== this.originalPhoneNumber && this.phoneNumber.length > 0);
  }


  closeDialog() {
    this.dialogRef.close();
  }

  backToMenuDialog() {
    this.closeDialog();
    this.dialog.open(UserMenuMainComponent);
  }

  goToChangePasswordDialog() {
    this.closeDialog();
    this.dialog.open(UserMenuChangePasswordComponent);
  }


  updateUserData() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      this.authService.updateUserData(jwt, this.name, this.phoneNumber).subscribe({
        next: () => {
          this.originalName = this.name;
          this.originalPhoneNumber = this.phoneNumber;
          this.isDataChanged = false;
        },
        error: error => {
          console.error('Error updating user data', error);
        }
      });
    }
  }

}
