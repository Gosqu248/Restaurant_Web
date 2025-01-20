import {Component, OnInit} from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import { environment } from '../../../enviorments/environment';
import {PayUService} from '../../services/pay-u.service';
import {Order, OrderStatus} from '../../interfaces/order';
import {OrderService} from '../../services/order.service';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-payment-confirmation',
  imports: [
    MatProgressSpinner,
    NgIf,
    RouterLink
  ],
  templateUrl: './payment-confirmation.component.html',
  styleUrl: './payment-confirmation.component.scss'
})
export class PaymentConfirmationComponent implements OnInit {
  status: string = '';
  paymentId: string = '';
  background = environment.api + '/img/Pay-conf-back.webp';
  order: Order = {} as Order;
  isLoading: boolean = true;


  constructor(private payUService: PayUService,
              private router: Router,
              private cartService: CartService,
              private orderService: OrderService) {
  }

  ngOnInit() {
    this.resetState();
    if (typeof window !== 'undefined' && window.localStorage) {

      const id = localStorage.getItem('payUPaymentId');


      if (id) {
        this.paymentId = id;

        setTimeout(() => {
          this.getStatus(this.paymentId);
        }, 800);
      }
    }
  }

  getStatus(paymentId: string) {
    this.payUService.getPaymentStatus(paymentId).subscribe({
      next: (status: string) => {
        this.isLoading = false;

        if (status === 'COMPLETED') {
          this.status = status
          this.cartService.clearCart();
          const order = localStorage.getItem('paymentOrder');
          if (order) {
            this.order = JSON.parse(order);
            console.log(this.order)
            this.order.paymentId = paymentId;
            this.order.status = OrderStatus.zapłacone;

            this.orderService.createOrder(this.order).subscribe(() => {});
            localStorage.removeItem("paymentOrder")
          } else {
            console.error('Brak zamówienia w localStorage');
          }
        } else {
          this.status = status;

          console.log('Płatność zakończona niepowodzeniem');
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Błąd podczas sprawdzania statusu płatności:', error);
      }
    });
  }

  goToOrders() {
    this.removeLocalStorage();
    this.router.navigate(['/orders-history']);
  }

  backToCheckout() {
    this.removeLocalStorage();
    this.router.navigate(['/checkout']);
  }

  removeLocalStorage() {
    localStorage.removeItem('payUPaymentId');
    localStorage.removeItem('paymentOrder');
  }

  resetState() {
    this.paymentId = '';
    this.status = '';
    this.order = {} as Order;
  }
}
