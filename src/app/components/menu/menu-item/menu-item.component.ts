import {Component, Input} from '@angular/core';
import {Menu} from '../../../interfaces/menu';
import {CurrencyPipe, NgIf} from '@angular/common';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';

registerLocaleData(localePl, 'pl');
@Component({
  selector: 'app-menu-item',
  imports: [
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './menu-item.component.html',
  standalone: true,
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() menu!: Menu;

}
