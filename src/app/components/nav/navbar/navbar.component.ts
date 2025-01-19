import {Component, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {UserMenuMainComponent} from '../../user-menu/user-menu-main/user-menu-main.component';
import {CartService} from '../../../services/cart.service';
import {CartItem} from '../../../interfaces/cart-item';
import {CurrencyPLPipe} from '../../../pipes/currency-pl.pipe';

@Component({
  selector: 'app-navbar',
  imports: [
    NgIf,
    RouterLink,
    CurrencyPLPipe
  ],
  templateUrl: './navbar.component.html',
  standalone: true,
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isMenuOpen = false;
  isAuth: boolean = false;
  cart: CartItem[] = [];
  totalPrice: number = 0;

  constructor(protected authService: AuthService,
              private cartService: CartService,
              private dialog: MatDialog) {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartService.totalPrice$.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  openMenuDialog() {
    this.dialog.open(UserMenuMainComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'centered-dialog',
      disableClose: false,
      autoFocus: true,

    })
  }
}
