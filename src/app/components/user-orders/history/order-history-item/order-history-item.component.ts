import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-order-history-item',
  imports: [],
  templateUrl: './order-history-item.component.html',
  styleUrl: './order-history-item.component.scss'
})
export class OrderHistoryItemComponent {
  @Input() order!: any;

}
