import {Component, Input} from '@angular/core';
import {CartItem} from '../../../../interfaces/cart-item';
import {CurrencyPLPipe} from '../../../../pipes/currency-pl.pipe';

@Component({
  selector: 'app-order-basket-item',
  imports: [
    CurrencyPLPipe
  ],
  templateUrl: './order-basket-item.component.html',
  styleUrl: './order-basket-item.component.scss'
})
export class OrderBasketItemComponent {
  @Input() cartItem!: CartItem;

  getOrderPrice() {
   return this.cartItem.menu.price * this.cartItem.quantity;
  }


}
