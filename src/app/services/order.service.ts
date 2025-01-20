import { Injectable } from '@angular/core';
import {environment} from '../../enviorments/environment';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.api + '/api/order';

  constructor(private http: HttpClient) { }

  createOrder(order: any) {
    return this.http.post(`${this.apiUrl}/createOrder`, order);
  }

}
