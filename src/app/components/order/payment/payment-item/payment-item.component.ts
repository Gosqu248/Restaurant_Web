import {Component, Input} from '@angular/core';
import {RestaurantInfoService} from '../../../../services/restaurant-info.service';
import {PaymentMethod} from '../../../../interfaces/payment-method';
import {MatDialogRef} from '@angular/material/dialog';
import {ChangePaymentComponent} from '../change-payment/change-payment.component';

@Component({
  selector: 'app-payment-item',
  imports: [],
  templateUrl: './payment-item.component.html',
  styleUrl: './payment-item.component.scss'
})
export class PaymentItemComponent {
  @Input() payment!: PaymentMethod;

  constructor(private infoService: RestaurantInfoService,
              public dialogRef: MatDialogRef<ChangePaymentComponent>) {
  }

  setPayment() {
    this.infoService.setSelectedPayment(this.payment);
    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
