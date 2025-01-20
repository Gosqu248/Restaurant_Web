import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';
import {CartService} from '../../../../services/cart.service';
import {CurrencyPLPipe} from '../../../../pipes/currency-pl.pipe';
import {OrderBasketItemComponent} from '../order-basket-item/order-basket-item.component';
import {CartItem} from '../../../../interfaces/cart-item';
import {RestaurantInfoService} from '../../../../services/restaurant-info.service';
import {Order, OrderStatus} from '../../../../interfaces/order';
import {PaymentMethod, PaymentResponse} from '../../../../interfaces/payment-method';
import {AuthService} from '../../../../services/auth.service';
import {UserDTO} from '../../../../interfaces/user';
import {OrderService} from '../../../../services/order.service';
import {Router} from '@angular/router';
import {PayUService} from '../../../../services/pay-u.service';

@Component({
  selector: 'app-order-basket',
  imports: [
    NgForOf,
    NgClass,
    CurrencyPLPipe,
    OrderBasketItemComponent
  ],
  templateUrl: './order-basket.component.html',
  styleUrl: './order-basket.component.scss'
})
export class OrderBasketComponent implements OnInit {
  @Input() isAuth!: boolean;
  totalPrice: number = 0;
  cart: CartItem[] = [];
  selectedHour: string | null = null;
  selectedPayment: PaymentMethod | null = null;
  comment: string = '';
  userData: UserDTO = {} as UserDTO;

  constructor(private cartService: CartService,
              private orderService: OrderService,
              private authService: AuthService,
              private router: Router,
              private payUService: PayUService,
              private infoService: RestaurantInfoService) {
  }


  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartService.totalPrice$.subscribe(totalPrice => this.totalPrice = totalPrice);
    this.infoService.selectedHour$.subscribe(hour => this.selectedHour = hour)
    this.infoService.selectedPayment$.subscribe(payment => this.selectedPayment = payment)
    this.infoService.comment$.subscribe(comment => this.comment = comment)
    this.authService.userData$.subscribe(userData => this.userData = userData)
  }
  canOrder(): boolean {
    return !!(this.isAuth && this.selectedHour)
  }

  orderAccepted() {

    const order: Order = {
      status: OrderStatus.niezapłacone,
      totalPrice: parseFloat(this.totalPrice.toFixed(2)),
      deliveryTime: this.selectedHour || '',
      comment: this.comment,
      paymentId: null,
      paymentMethod: this.selectedPayment?.method || '',
      orderMenus: this.cart,
      user: this.userData,
    }

    if (this.selectedPayment?.method === 'Gotówka') {
        this.orderService.createOrder(order).subscribe(() => {});
        this.cartService.clearCart();
        setTimeout(() => {
          this.router.navigate(['/orders-history'])
        }, 1000);
    } else {
      this.payUService.createPayUPayment(order).subscribe({
        next: (response: PaymentResponse) => {
          localStorage.setItem('payUPaymentId', response.orderId.toString());
          localStorage.setItem('paymentOrder', JSON.stringify(order));
          window.open(response.redirectUri, '_self');
        },
        error: (error) => {
          console.error('Błąd podczas tworzenia płatności:', error);
        }
      });
    }
  }
}
