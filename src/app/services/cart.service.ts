import { Injectable } from '@angular/core';
import {CartItem} from '../interfaces/cart-item';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly STORAGE_KEY = 'cart';

  private readonly cart: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  readonly cart$ = this.cart.asObservable();

  private readonly totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  readonly totalPrice$ = this.totalPrice.asObservable();

  constructor() { }

  addToCart(item: CartItem): void {
    const cart = this.cart.getValue();
    const existingItem = cart.find(i => i.menu === item.menu);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    this.cart.next(cart);
    console.log(this.cart.getValue());
    this.saveCartToStorage(cart);
  }

  getCart(): CartItem[] {
    return this.cart.getValue();
  }

  clearCart(): void {
    this.cart.next([]);
    this.saveCartToStorage([]);
  }

  calculateTotalPrice(): void {
    const cart = this.cart.getValue();
    const total = cart.reduce((acc, item) => acc + item.menu.price * item.quantity, 0);
    this.totalPrice.next(total);
  }

  private loadCartFromStorage(): CartItem[] {
    const cart = localStorage.getItem('STORAGE_KEY');
    return cart ? JSON.parse(cart) : [];
  }

  private saveCartToStorage(cart: CartItem[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
  }
}
