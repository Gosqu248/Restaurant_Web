import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../../interfaces/cart-item';
import {CartService} from '../../../services/cart.service';
import {NgForOf, NgIf} from '@angular/common';
import {CurrencyPLPipe} from '../../../pipes/currency-pl.pipe';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {BasketItemComponent} from '../basket-item/basket-item.component';

@Component({
  selector: 'app-basket-main',
  imports: [
    NgIf,
    CurrencyPLPipe,
    MatIconButton,
    MatIcon,
    NgForOf,
    BasketItemComponent,
    MatButton
  ],
  templateUrl: './basket-main.component.html',
  styleUrl: './basket-main.component.scss'
})
export class BasketMainComponent implements OnInit{
  cart: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartService.totalPrice$.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    });
  }

}
