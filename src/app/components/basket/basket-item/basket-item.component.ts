import {Component, Input} from '@angular/core';
import {CartItem} from '../../../interfaces/cart-item';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {CurrencyPLPipe} from '../../../pipes/currency-pl.pipe';
import {CartService} from '../../../services/cart.service';

@Component({
  selector: 'app-basket-item',
  imports: [
    MatIconButton,
    MatIcon,
    CurrencyPLPipe
  ],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.scss'
})
export class BasketItemComponent {
  @Input() item!: CartItem;

  constructor(private cartService: CartService) {
  }

  addOne() {
    this.cartService.addOneToCart(this.item);
  }

  removeOne() {
    this.cartService.removeOneFromCart(this.item);
  }
}
