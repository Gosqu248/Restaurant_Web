import {Component, Input, OnInit} from '@angular/core';
import {OrderMenu} from '../../../../interfaces/order';
import {NgIf} from '@angular/common';
import {MenuService} from '../../../../services/menu.service';
import {Menu} from '../../../../interfaces/menu';

@Component({
  selector: 'app-order-history-menu-item',
  imports: [
    NgIf
  ],
  templateUrl: './order-history-menu-item.component.html',
  styleUrl: './order-history-menu-item.component.scss'
})
export class OrderHistoryMenuItemComponent implements OnInit{
  @Input() item!: OrderMenu;
  menuItem: Menu | null = null;
  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
   this.menuItem = this.menuService.findMenuById(this.item.menuId)
  }

}
