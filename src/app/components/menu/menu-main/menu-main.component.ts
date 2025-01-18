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

@Component({
  selector: 'app-menu-main',
  imports: [
    NgForOf,
    NgxParticlesModule,
    MenuItemComponent,
    MenuCategoryComponent
  ],
  templateUrl: './menu-main.component.html',
  standalone: true,
  styleUrl: './menu-main.component.scss'
})
export class MenuMainComponent implements OnInit, OnDestroy {
  filteredMenus: Menu[] = [];
  private destroy$ = new Subject<void>();

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
      .subscribe((menus) => this.filteredMenus = menus);
  }

  generateParticles(): void {
     this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }


}
