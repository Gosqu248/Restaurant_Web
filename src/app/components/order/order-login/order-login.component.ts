import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order-login',
  imports: [
  ],
  templateUrl: './order-login.component.html',
  styleUrl: './order-login.component.scss'
})
export class OrderLoginComponent {

  constructor(private router: Router) {
  }

  goToLogin() {
   this.router.navigate(['/auth']);
  }
}
