import { Injectable } from '@angular/core';
import {environment} from '../../enviorments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Order, OrderDTO, OrderResponse} from "../interfaces/order";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.api + '/api/order';

  constructor(private http: HttpClient) { }

  getUserOrders(token: string): Observable<OrderDTO[]> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<OrderDTO[]>(`${this.apiUrl}/user`, {headers});
  }

  createOrder(order: Order): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/createOrder`, order);
  }

}
