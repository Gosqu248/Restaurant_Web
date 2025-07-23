import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NgForOf} from '@angular/common';
import {PaymentMethod} from '../../../../interfaces/payment-method';
import {PaymentItemComponent} from '../payment-item/payment-item.component';

@Component({
  selector: 'app-change-payment',
  imports: [
    NgForOf,
    PaymentItemComponent
  ],
  templateUrl: './change-payment.component.html',
  styleUrl: './change-payment.component.scss'
})
export class ChangePaymentComponent {
  paymentMethods: PaymentMethod[] = [];
  selectedPayment: PaymentMethod = {} as PaymentMethod;

  constructor(public dialogRef: MatDialogRef<ChangePaymentComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { paymentMethods: PaymentMethod[], selectedPayment: PaymentMethod }) {
    this.paymentMethods = data.paymentMethods;
    this.selectedPayment = data.selectedPayment;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
