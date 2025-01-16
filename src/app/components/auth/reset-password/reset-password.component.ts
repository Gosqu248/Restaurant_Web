import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './reset-password.component.html',
  standalone: true,
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  showPassword: boolean = false;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {
    this.resetForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!#]).*$/)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  isPasswordMatch(): boolean {
    const password = this.resetForm.get('password')?.value;
    const confirmPassword = this.resetForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
  onSubmit() {
    if (this.resetForm.valid) {
      const password = this.resetForm.value.password;
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        this.authService.resetPassword(jwt, password).subscribe({
          next: (response) => {
            console.log('Password reset successful:', response.message);
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.error('Error resetting password:', error);
            if (error.error && typeof error.error === 'object') {
              console.error('Error message:', error.error.error);
            } else {
              console.error('Unexpected error format');
            }
          }
        });
      } else {
        console.error('No JWT token found');
      }
    }
  }

}
