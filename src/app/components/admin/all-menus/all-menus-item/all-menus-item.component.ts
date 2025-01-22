import {Component, Input} from '@angular/core';
import {Menu} from '../../../../interfaces/menu';
import {MenuService} from '../../../../services/menu.service';
import {MatDialog} from '@angular/material/dialog';
import {AddMenuComponent} from '../../add-menu/add-menu.component';
import {EditMenuComponent} from '../edit-menu/edit-menu.component';

@Component({
  selector: 'app-all-menus-item',
  imports: [],
  templateUrl: './all-menus-item.component.html',
  styleUrl: './all-menus-item.component.scss'
})
export class AllMenusItemComponent {
  @Input() menu!: Menu;

  constructor(private menuService: MenuService, private dialog: MatDialog) {
  }

  editMenu() {
    this.dialog.open(EditMenuComponent, {
      maxWidth: '100%',
      data: this.menu
    })
  }


  deleteMenu() {
    this.menuService.deleteMenu(this.menu.id).subscribe({
      next: () => {
        console.log('Menu deleted');
        this.menuService.clearStorage();
        this.menuService.fetchMenus();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
