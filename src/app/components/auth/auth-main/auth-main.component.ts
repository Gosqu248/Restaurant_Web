import { Component } from '@angular/core';
import {NgClass, NgIf} from '@angular/common';
import {LoginComponent} from '../login/login.component';
import {RegisterComponent} from '../register/register.component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {RememberPasswordComponent} from '../remember-password/remember-password.component';

@Component({
  selector: 'app-auth-main',
  imports: [
    NgClass,
    NgIf,
    LoginComponent,
    RegisterComponent,
  ],
  templateUrl: './auth-main.component.html',
  standalone: true,
  styleUrl: './auth-main.component.scss',
  animations: [
    trigger('formAnimation', [
      state('login', style({ opacity: 1, transform: 'translateX(0)' })),
      state('register', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('login => register', [
        style({ opacity: 0, transform: 'translateX(30%)' }), // Login exits to the left
        animate('0.4s 0.1s ease-in')
      ]),
      transition('register => login', [
        style({ opacity: 0, transform: 'translateX(-30%)' }), // Register exits to the right
        animate('0.4s 0.1s ease-in')
      ])
    ])
  ]
})
export class AuthMainComponent {
  isLogin: boolean = true;

  toggleForm(formType: string) {
    this.isLogin = formType === 'login';
  }
}
