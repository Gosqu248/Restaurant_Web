import { Injectable } from '@angular/core';
import {DeliveryHour} from '../interfaces/delivery-hour';
import {PaymentMethod} from '../interfaces/payment-method';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantInfoService {
  private deliveryHours: DeliveryHour[] = [
    { dayOfWeek: 0, openTime: '8:00', closeTime: '22:00' },
    { dayOfWeek: 1, openTime: '8:00', closeTime: '21:00' },
    { dayOfWeek: 2, openTime: '8:00', closeTime: '21:00' },
    { dayOfWeek: 3, openTime: '8:00', closeTime: '21:00' },
    { dayOfWeek: 4, openTime: '8:00', closeTime: '21:00' },
    { dayOfWeek: 5, openTime: '9:00', closeTime: '23:00' },
    { dayOfWeek: 6, openTime: '9:00', closeTime: '23:00' }
  ]
  pickUpTimeMin: number = 15;
  pickUpTimeMax: number = 30;

  paymentMethods: PaymentMethod[] = [
    { method: 'Gotówka', image: 'assets/images/cash.png' },
    { method: 'PayU', image: 'assets/images/payU.png' }
  ];

  private selectedPayment: BehaviorSubject<PaymentMethod> = new BehaviorSubject<PaymentMethod>(this.paymentMethods[0]);
  private selectedHour: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)

  selectedPayment$ = this.selectedPayment.asObservable();
  selectedHour$ = this.selectedHour.asObservable();


  constructor() { }
  getOpeningHours(): DeliveryHour[] {
    return this.deliveryHours;
  }

  getCurrentOpeningHours(): DeliveryHour | undefined {
    const currentDay = new Date().getDay();
    console.log(this.deliveryHours.find(hour => hour.dayOfWeek === currentDay));
    return this.deliveryHours.find(hour => hour.dayOfWeek === currentDay);
  }

  setSelectedPayment(payment: PaymentMethod) {
    this.selectedPayment.next(payment);
  }

  setSelectedHour(hour: string | null) {
    this.selectedHour.next(hour);
  }

}
