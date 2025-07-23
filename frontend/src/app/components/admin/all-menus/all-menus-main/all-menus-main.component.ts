import {Component, OnInit} from '@angular/core';
import {NgParticlesService, NgxParticlesModule} from '@tsparticles/angular';
import type {Engine, ISourceOptions} from '@tsparticles/engine';
import configs from '@tsparticles/configs';
import {loadSlim} from '@tsparticles/slim';
import {NgForOf} from '@angular/common';
import {MenuService} from '../../../../services/menu.service';
import {Menu} from '../../../../interfaces/menu';
import {AllMenusItemComponent} from '../all-menus-item/all-menus-item.component';

@Component({
  selector: 'app-all-menus-main',
  imports: [
    NgxParticlesModule,
    AllMenusItemComponent,
    NgForOf,
  ],
  templateUrl: './all-menus-main.component.html',
  styleUrl: './all-menus-main.component.scss'
})
export class AllMenusMainComponent implements OnInit {
  menus: Menu[] = [];

  id = "tsparticles";
  particlesOptions: ISourceOptions = {
    ...configs.slow,
    background: {
      color: {
        value: "transparent"
      }
    },
  };

  constructor(private menuService: MenuService,
              private readonly ngParticlesService: NgParticlesService) {
  }

  ngOnInit(): void {
    this.loadMenus();
    this.generateParticles();
  }

  loadMenus() {
    this.menuService.menus$.subscribe(menus => {
      this.menus = menus;
      console.log('Menus:', menus);
    });
  }

  generateParticles(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }
}
