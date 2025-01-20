import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RestaurantInfoService} from '../../../services/restaurant-info.service';

@Component({
  selector: 'app-order-comment',
  imports: [
    FormsModule
  ],
  templateUrl: './order-comment.component.html',
  styleUrl: './order-comment.component.scss'
})
export class OrderCommentComponent {
  relevantInformation: string = '';

  constructor(private infoService: RestaurantInfoService) {
  }

  saveComment() {
    this.infoService.setComment(this.relevantInformation);
  }

}
