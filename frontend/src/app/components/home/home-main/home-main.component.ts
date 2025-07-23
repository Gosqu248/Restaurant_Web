import { Component } from '@angular/core';
import {HomeMainImageComponent} from '../home-main-image/home-main-image.component';
import {HomeAboutComponent} from '../home-about/home-about.component';
import {HomeContactComponent} from '../home-contact/home-contact.component';
import {HomeWhyUsComponent} from '../home-why-us/home-why-us.component';

@Component({
  selector: 'app-home-main',
  imports: [
    HomeMainImageComponent,
    HomeAboutComponent,
    HomeContactComponent,
    HomeWhyUsComponent
  ],
  templateUrl: './home-main.component.html',
  standalone: true,
  styleUrl: './home-main.component.scss'
})
export class HomeMainComponent {

}
