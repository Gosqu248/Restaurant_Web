import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

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

}
