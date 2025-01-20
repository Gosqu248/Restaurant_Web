import {Component, OnInit} from '@angular/core';
import {RestaurantInfoService} from '../../../../services/restaurant-info.service';
import {PaymentMethod} from '../../../../interfaces/payment-method';
import {NgIf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ChangePaymentComponent} from '../change-payment/change-payment.component';

@Component({
  selector: 'app-order-payment',
  imports: [
    NgIf
  ],
  templateUrl: './order-payment.component.html',
  styleUrl: './order-payment.component.scss'
})
export class OrderPaymentComponent implements OnInit{
  paymentMethods: PaymentMethod[] = [];
  selectedPayment: PaymentMethod = {} as PaymentMethod;

  constructor(private infoService: RestaurantInfoService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.paymentMethods = this.infoService.paymentMethods;
    this.infoService.selectedPayment$.subscribe(payment => this.selectedPayment = payment)
  }


  openEditDialog() {
    this.dialog.open(ChangePaymentComponent, {
      width: '600px',
      maxWidth: '100vw',
      data: { paymentMethods: this.paymentMethods, selectedPayment: this.selectedPayment }
    });

  }
}
