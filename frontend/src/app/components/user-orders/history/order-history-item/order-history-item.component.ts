import {Component, Input, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf, registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {OrderHistoryMenuItemComponent} from '../order-history-menu-item/order-history-menu-item.component';
import {OrderDTO} from '../../../../interfaces/order';
import {CurrencyPLPipe} from '../../../../pipes/currency-pl.pipe';

@Component({
  selector: 'app-order-history-item',
  imports: [
    NgIf,
    OrderHistoryMenuItemComponent,
    NgForOf,
    CurrencyPLPipe
  ],
  templateUrl: './order-history-item.component.html',
  styleUrl: './order-history-item.component.scss'
})
export class OrderHistoryItemComponent implements OnInit{
  @Input() order!: OrderDTO;
  isVisible = false;

  constructor(private datePipe: DatePipe) {
  }

  ngOnInit() {
    registerLocaleData(localePl, 'pl-PL');
  }


  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  getFormattedDate(date: string): string | null {
    return this.datePipe.transform(date, 'd MMMM yyyy', undefined,'pl-PL');
  }

  getFormattedTime(orderDate: string) {
    return this.datePipe.transform(orderDate, 'HH:mm', undefined, 'pl-PL');
  }

  getPaymentMethod() {
    return this.order.paymentMethod === 'Gotówka' ? 'Gotówka' : 'PayU';
  }

}
