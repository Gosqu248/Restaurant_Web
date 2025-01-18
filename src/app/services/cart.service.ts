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

  constructor() { }

  private loadCartFromStorage(): CartItem[] {
    const cart = localStorage.getItem('STORAGE_KEY');
    return cart ? JSON.parse(cart) : [];
  }
}
