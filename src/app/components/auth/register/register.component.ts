import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {User} from '../../../interfaces/user';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  showPassword: boolean = false;
  registerForm: FormGroup;
  @Input() isLogin!: boolean;
  @Output() isLoginChange = new EventEmitter<boolean>();
  @Output() formToggle = new EventEmitter<string>();

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+48\s?)?(\d{3}\s?\d{3}\s?\d{3})$/)]],
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
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: User = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        phoneNumber: this.registerForm.value.phoneNumber,
        password: this.registerForm.value.password,
        role: 'user'
      }

      this.authService.register(user).subscribe({
        next: (response: any) => {
          alert(response.message);
          this.formToggle.emit('login');

        },
        error: (err) => {
          console.error('Registration failed', err);
          alert('Error registering user');
        }
      });

    }
  }

  loginWithGoogle() {
    this.authService.initiateGoogleLogin();
  }
}
