import {Component, Input, OnInit} from '@angular/core';
import {DecimalPipe, NgClass, NgForOf} from '@angular/common';
import {CartService} from '../../../../services/cart.service';
import {CurrencyPLPipe} from '../../../../pipes/currency-pl.pipe';
import {OrderBasketItemComponent} from '../order-basket-item/order-basket-item.component';
import {Menu} from '../../../../interfaces/menu';
import {CartItem} from '../../../../interfaces/cart-item';
import {RestaurantInfoService} from '../../../../services/restaurant-info.service';

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

  constructor(private cartService: CartService, private  infoService: RestaurantInfoService) {
  }


  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartService.totalPrice$.subscribe(totalPrice => this.totalPrice = totalPrice);
    this.infoService.selectedHour$.subscribe(hour => this.selectedHour = hour)
  }
  canOrder(): boolean {
    return !!(this.isAuth && this.selectedHour)
  }

  orderAccepted() {

  }
}
