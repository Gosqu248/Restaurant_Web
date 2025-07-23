import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../../interfaces/cart-item';
import {CartService} from '../../../services/cart.service';
import {NgForOf} from '@angular/common';
import {CurrencyPLPipe} from '../../../pipes/currency-pl.pipe';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {BasketItemComponent} from '../basket-item/basket-item.component';
import {MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basket-main',
  imports: [
    CurrencyPLPipe,
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

  constructor(private cartService: CartService,
              private router: Router,
              public dialogRef: MatDialogRef<BasketMainComponent>) {
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartService.totalPrice$.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    });
  }

  goToOrder() {
    this.dialogRef.close();
    this.router.navigate(['/checkout']);
  }

}
