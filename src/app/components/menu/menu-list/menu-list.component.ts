import { Component, OnInit } from '@angular/core';
import {MenuService} from '../../../services/menu.service';
import {Menu} from '../../../interfaces/menu';


@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  standalone: true,
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  menus: Menu[] = [];

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  loadMenus(): void {
    this.menuService.getAllMenus().subscribe({
      next: (menus) => {
        this.menus = menus;
      },
      error: (error) => {
        console.error('Error fetching menus', error);
      }
    });
  }
}
