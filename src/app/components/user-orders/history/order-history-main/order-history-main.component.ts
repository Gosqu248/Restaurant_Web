import {Component, OnInit} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {OrderHistoryItemComponent} from '../order-history-item/order-history-item.component';
import {environment} from '../../../../../enviorments/environment';
import {OrderDTO} from '../../../../interfaces/order';
import {AuthService} from '../../../../services/auth.service';
import {OrderService} from '../../../../services/order.service';

@Component({
  selector: 'app-order-history-main',
  imports: [
    MatProgressSpinner,
    NgIf,
    OrderHistoryItemComponent,
    NgForOf
  ],
  templateUrl: './order-history-main.component.html',
  styleUrl: './order-history-main.component.scss',
  providers: [DatePipe]
})
export class OrderHistoryMainComponent implements OnInit {
  background = environment.api + '/img/ordersBackground.webp';
  orders: OrderDTO[] = [];
  isLoading: boolean = true;
  isAuth: boolean = false;

  constructor(private authService: AuthService,
              private orderService: OrderService ) {
  }

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(isAuth => this.isAuth = isAuth);
    this.getUserOrders();
  }


  getUserOrders() {
    if (this.isAuth) {
      const token = localStorage.getItem('jwt');
      if (!token) {
        console.error('No token found');
        return;
      }

      this.orderService.getUserOrders(token).subscribe({
        next: (orders) => {
          this.orders = orders;
          console.log('User orders:', orders);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error getting user orders:', error);
        }
      });
    }
  }

}
