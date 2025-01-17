import {Component, OnInit} from '@angular/core';
import {Menu} from '../../../interfaces/menu';
import type {Container, Engine, ISourceOptions} from '@tsparticles/engine';
import configs from '@tsparticles/configs';
import {MenuService} from '../../../services/menu.service';
import {NgParticlesService, NgxParticlesModule} from '@tsparticles/angular';
import {loadSlim} from '@tsparticles/slim';
import {NgForOf} from '@angular/common';
import {MenuItemComponent} from '../menu-item/menu-item.component';

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

    void this.ngParticlesService.init(async (engine: Engine) => {
      console.log("init", engine);

      await loadSlim(engine);
    });
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

  particlesLoaded(container: Container): void {
    console.log(container);
  }
}
