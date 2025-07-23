import { Component } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserMenuProfileComponent} from '../user-menu-profile/user-menu-profile.component';

@Component({
  selector: 'app-user-menu-change-password',
  imports: [
    NgClass,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './user-menu-change-password.component.html',
  standalone: true,
  styleUrl: './user-menu-change-password.component.scss'
})
export class UserMenuChangePasswordComponent {
  isVisibleOldPassword: boolean = false;
  isVisibleNewPassword: boolean = false;
  isVisibleConfirm: boolean = false;
  resetForm: FormGroup;
  isError: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<UserMenuChangePasswordComponent>,
  ) {
    this.resetForm = this.fb.group({
      oldPassword: [''],
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!#]).*$/)
      ]],
      confirmPassword: ['', Validators.required],
    }, {validators: this.passwordMatchValidator});
  }

  changePassword() {
    if (this.resetForm.valid) {
      const token = localStorage.getItem('jwt');

      const oldPassword = this.resetForm.value.oldPassword
      const newPassword = this.resetForm.value.newPassword

      if(token) {
        this.authService.changePassword(token, oldPassword, newPassword).subscribe({
          next: response => {
            console.log('Password changed: ', response);
            this.backToMenuProfileDialog();
          },
          error: error => {
            console.log('Error changing password');
            this.isError = true;
          }
        });
      }

    }
  }


  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    return newPassword && confirmPassword && newPassword.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  };

  showErrorFor(controlName: string): boolean {
    const control = this.resetForm.get(controlName);
    if (controlName === 'confirmPassword') {
      return control ? control.invalid && (control.dirty || control.touched) && control.value !== '' || this.resetForm.hasError('passwordMismatch') && control.value : false;
    }
    return control ? control.invalid && (control.dirty || control.touched) && control.value !== '' : false;
  }

  togglePasswordVisibility(fieldId: string) {
    const inputField = document.getElementById(fieldId) as HTMLInputElement;
    inputField.type === 'password' ? inputField.type = 'text' : inputField.type = 'password';

    fieldId === 'oldPassword' ? this.isVisibleOldPassword = !this.isVisibleOldPassword : fieldId === 'newPassword' ? this.isVisibleNewPassword = !this.isVisibleNewPassword : this.isVisibleConfirm = !this.isVisibleConfirm;

  }
  closeDialog() {
    this.dialogRef.close();
  }

  backToMenuProfileDialog() {
    this.closeDialog();
    this.dialog.open(UserMenuProfileComponent);
  }

}
