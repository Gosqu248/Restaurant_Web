import { Component } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {RememberPasswordComponent} from '../remember-password/remember-password.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    RememberPasswordComponent
  ],
  templateUrl: './login.component.html',
  standalone: true,
  styleUrl: './login.component.scss',

})
export class LoginComponent {
  showPassword: boolean = false;
  loginForm: FormGroup;
  is2FA: boolean = false;
  isLoginError: boolean = false;
  errorMessage: string | null = null;
  twoFactorCode: string = '';
  isRememberPassword: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.is2FA = false;

      this.authService.login(email, password)
        .subscribe({
          next: (isAuthenticated: boolean) => {
            if (isAuthenticated) {
              this.is2FA = true;
            } else {
              console.log("Nieprawidłowy login lub hasło");
              this.isLoginError = true;
            }
          },
          error: (error) => {
            if (error.message === 'Account is locked. Try again later.') {
              console.error('Konto jest zablokowane, spróbuj później.');
              this.isLoginError = true;
              this.errorMessage = 'locked';
            } else {
              console.error('Login error: ', error);
              this.isLoginError = true;
            }
          }
        });
    }
  }

  loginWithGoogle() {
    this.authService.initiateGoogleLogin();
  }

  verify2FA(code: string) {
    this.authService.verify2FA(code).subscribe({
      next: (isAuthenticated: boolean) => {
        if (isAuthenticated) {
          console.log("Logged in successfully");
          this.router.navigate(['/'])
        } else {
          console.error("Invalid 2FA code");
          this.isLoginError = true;
        }
      },
      error: (error) => {
        console.error('2FA error: ', error);
        this.isLoginError = true;
      }
    });
  }

  showRememberPassword() {
    this.isRememberPassword = !this.isRememberPassword;
  }


}
