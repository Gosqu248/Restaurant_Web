import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../../../services/menu.service';
import {Menu} from '../../../interfaces/menu';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CurrencyPipe
  ],
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit{
  menus: Menu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.menus$.subscribe({
      next: (menus: Menu[]) => {
        this.menus = menus;
        console.log('Menus loaded', menus);
      },
      error: (error) => {
        console.error('Error fetching menus', error);
      }
    });
  }
}
