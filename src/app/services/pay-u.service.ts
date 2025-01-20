import { Injectable } from '@angular/core';
import {environment} from '../../enviorments/environment';
import {HttpClient} from '@angular/common/http';
import {Order} from '../interfaces/order';
import {Observable} from 'rxjs';
import {PaymentResponse} from '../interfaces/payment-method';

@Injectable({
  providedIn: 'root'
})
export class PayUService {
  private apiUrl = environment.api + '/api/payU';

  constructor(private http: HttpClient) { }
  createPayUPayment(order: Order): Observable<PaymentResponse> {
    return this.http.post<PaymentResponse>(`${this.apiUrl}/createPayment`, order);
  }

  getPaymentStatus(orderId: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/getPaymentStatus?orderId=${orderId}`, { responseType: 'text' });
  }


}
