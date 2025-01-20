import { Injectable } from '@angular/core';
import {environment} from '../../enviorments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order} from "../interfaces/order";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.api + '/api/order';

  constructor(private http: HttpClient) { }

  getUserOrders(token: string) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<Order[]>(`${this.apiUrl}/getUserOrders`, {headers});
  }
  createOrder(order: Order) {
    return this.http.post(`${this.apiUrl}/createOrder`, order);
  }

}
