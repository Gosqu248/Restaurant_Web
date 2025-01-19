import {Injectable} from '@angular/core';
import {CartItem} from '../interfaces/cart-item';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly cart: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.loadCartFromStorage());
  private readonly totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(this.calculateTotalPrice(this.getCart()));
  totalPrice$ = this.totalPrice.asObservable();

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
    this.totalPrice.next(this.calculateTotalPrice(cart));
    this.saveCartToStorage(cart);
  }

  getCart(): CartItem[] {
    return this.cart.getValue();
  }

  clearCart(): void {
    this.cart.next([]);
    this.totalPrice.next(0);
    this.saveCartToStorage([]);
  }

  private calculateTotalPrice(cart: CartItem[]) {
    return cart.reduce((total, item) => total + (item.menu.price * item.quantity), 0);
  }


  private loadCartFromStorage(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  private saveCartToStorage(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
