import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-remember-password',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './remember-password.component.html',
  standalone: true,
  styleUrl: './remember-password.component.scss'
})
export class RememberPasswordComponent {
  rememberPasswordForm: FormGroup;
  @Output() backToLogin = new EventEmitter<unknown>();

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
    this.rememberPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    this.authService.sendResetPasswordEmail(this.rememberPasswordForm.value.email).subscribe({
      next: () => console.log('Reset password email sent'),
      error: error => console.error('Error sending reset password email', error)
    })
    this.back();
  }

  back() {
    this.backToLogin.emit();
  }

}
