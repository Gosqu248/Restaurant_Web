import {Component, OnInit} from '@angular/core';
import {Menu} from '../../../interfaces/menu';
import type {Engine, ISourceOptions} from '@tsparticles/engine';
import configs from '@tsparticles/configs';
import {MenuService} from '../../../services/menu.service';
import {NgParticlesService, NgxParticlesModule} from '@tsparticles/angular';
import {loadSlim} from '@tsparticles/slim';
import {NgForOf} from '@angular/common';
import {MenuItemComponent} from '../menu-item/menu-item.component';
import {Category} from '../../../interfaces/category';

@Component({
  selector: 'app-menu-main',
  imports: [
    NgForOf,
    NgxParticlesModule,
    MenuItemComponent
  ],
  templateUrl: './menu-main.component.html',
  standalone: true,
  styleUrl: './menu-main.component.scss'
})
export class MenuMainComponent implements OnInit {
  menus: Menu[] = [];
  categories: Category[] = [];
  filteredMenus: Menu[] = [];
  selectedCategory: Category | null = null;

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
    this.filteredMenus = this.menus;
    this.loadCategories();
    this.generateParticles();
  }

  generateParticles(): void {
     this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }
  loadMenus(): void {
    this.menuService.menus$.subscribe({
      next: (menus: Menu[]) => {
        this.filteredMenus = menus;
        this.menus = menus;
      },
      error: (error) => {
        console.error('Error fetching menus', error);
      }
    });
  }

  loadCategories(): void {
    this.categories = this.menuService.getCategories();
  }

  filterMenus(category: Category) {
    if (category === this.selectedCategory) {
      this.filteredMenus = this.menus;
      this.selectedCategory = null;
      return;
    } else {
      this.filteredMenus = this.menus.filter((menu) => menu.category === category.name);
      this.selectedCategory = category;

    }
  }
}
