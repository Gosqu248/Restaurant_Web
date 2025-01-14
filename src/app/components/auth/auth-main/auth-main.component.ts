import { Component } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';

@Component({
  selector: 'app-auth-main',
  imports: [
    NgClass,
    NgIf,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './auth-main.component.html',
  standalone: true,
  styleUrl: './auth-main.component.scss'
})
export class AuthMainComponent {
  isLogin: boolean = true; // Default to login form

  toggleForm(formType: string) {
    this.isLogin = formType === 'login';
  }
}
