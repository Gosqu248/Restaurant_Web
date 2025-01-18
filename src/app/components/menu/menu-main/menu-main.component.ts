import {Component, OnDestroy, OnInit} from '@angular/core';
import {Menu} from '../../../interfaces/menu';
import type {Engine, ISourceOptions} from '@tsparticles/engine';
import configs from '@tsparticles/configs';
import {MenuService} from '../../../services/menu.service';
import {NgParticlesService, NgxParticlesModule} from '@tsparticles/angular';
import {loadSlim} from '@tsparticles/slim';
import {NgForOf} from '@angular/common';
import {MenuItemComponent} from '../menu-item/menu-item.component';
import {MenuCategoryComponent} from '../menu-category/menu-category.component';
import {Subject, takeUntil} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {GroupedMenuItems} from '../../../interfaces/grouped-menu-items';

@Component({
  selector: 'app-menu-main',
  imports: [
    NgForOf,
    NgxParticlesModule,
    MenuItemComponent,
    MenuCategoryComponent,
    FormsModule,
  ],
  templateUrl: './menu-main.component.html',
  standalone: true,
  styleUrl: './menu-main.component.scss'
})
export class MenuMainComponent implements OnInit, OnDestroy {
  menus: Menu[] = [];
  private destroy$ = new Subject<void>();
  searchMenuItem: string = '';
  filteredMenus: Menu[] = [];
  groupedMenuItems: GroupedMenuItems[] = [];


  id = "tsparticles";
  particlesOptions: ISourceOptions = {
    ...configs.snow,
    background: {
      color: {
        value: "#faa86f"
      }
    },
  };

  constructor(private menuService: MenuService, private readonly ngParticlesService: NgParticlesService) {
  }

  ngOnInit(): void {
    this.loadMenus();
    this.generateParticles();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadMenus(): void {
    this.menuService.filteredMenus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((menus) => {
        this.menus = menus;
        this.groupMenuItems(menus);
      });
  }

  generateParticles(): void {
     this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

  filterMenus() {
    if (this.searchMenuItem !== '') {
      const filteredMenus = this.menus.filter((menu) => {
        return menu.name.toLowerCase().includes(this.searchMenuItem.toLowerCase());
      });
      this.groupMenuItems(filteredMenus);
    } else {
      this.groupMenuItems(this.menus);
    }
  }

  private groupMenuItems(menus: Menu[]) {
    const groupedMap = new Map<string, Menu[]>();

    menus.forEach((menu) => {
      if (!groupedMap.has(menu.category)) {
        groupedMap.set(menu.category, []);
      }
      groupedMap.get(menu.category)?.push(menu);
    });

    this.groupedMenuItems = Array.from(groupedMap.entries())
      .map(([category, items]) => ({
        category,
        items: items.sort((a, b) => a.name.localeCompare(b.name))
      }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }
}
