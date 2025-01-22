import {Component, Input, OnInit} from '@angular/core';
import {AdminOrderDTO, OrderStatus} from '../../../../interfaces/order';
import {DatePipe, NgForOf, NgIf, registerLocaleData} from '@angular/common';
import {CurrencyPLPipe} from '../../../../pipes/currency-pl.pipe';
import {
  OrderHistoryMenuItemComponent
} from '../../../user-orders/history/order-history-menu-item/order-history-menu-item.component';
import localePl from '@angular/common/locales/pl';
import {OrderService} from '../../../../services/order.service';

@Component({
  selector: 'app-monitor-order-item',
  imports: [
    NgIf,
    CurrencyPLPipe,
    OrderHistoryMenuItemComponent,
    NgForOf
  ],
  templateUrl: './monitor-order-item.component.html',
  styleUrl: './monitor-order-item.component.scss'
})
export class MonitorOrderItemComponent implements OnInit {
  @Input() order!: AdminOrderDTO;
  isVisible: boolean = false;

  constructor(private datePipe: DatePipe,
              private orderService: OrderService) {
  }

  ngOnInit() {
    registerLocaleData(localePl, 'pl-PL');
  }

  changeStatus() {
    this.orderService.changeOrderStatus(this.order.id).subscribe({
      next: (response) => {
        this.order.status = response;
        console.log('Order status changed:', response);
      },
      error: (error) => {
        console.error('Error changing order status:', error);
      }
    })
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

}
