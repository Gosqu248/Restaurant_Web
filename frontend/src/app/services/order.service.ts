import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AdminOrderDTO, Order, OrderDTO, OrderResponse, OrderStatus} from "../interfaces/order";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.api + '/api/orders';

  constructor(private http: HttpClient) { }

  getUserOrders(token: string): Observable<OrderDTO[]> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<OrderDTO[]>(`${this.apiUrl}/user`, {headers});
  }

  createOrder(order: Order): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/createOrder`, order);
  }

  getAllOrders(token: string): Observable<AdminOrderDTO[]> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<AdminOrderDTO[]>(`${this.apiUrl}/all`, {headers});
  }

  changeOrderStatus(orderId: number): Observable<OrderStatus> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.put<OrderStatus>(`${this.apiUrl}/changeStatus/${orderId}`, {}, {headers});
  }

}
