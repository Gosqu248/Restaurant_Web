import {Component, Input} from '@angular/core';
import {Menu} from '../../../interfaces/menu';
import {CurrencyPipe, NgIf} from '@angular/common';
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {CurrencyPLPipe} from '../../../pipes/currency-pl.pipe';

registerLocaleData(localePl, 'pl');
@Component({
  selector: 'app-menu-item',
  imports: [
    NgIf,
    CurrencyPLPipe
  ],
  templateUrl: './menu-item.component.html',
  standalone: true,
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() menu!: Menu;

}
