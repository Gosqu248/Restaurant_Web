import {Component, OnInit} from '@angular/core';
import type {Engine, ISourceOptions} from '@tsparticles/engine';
import configs from '@tsparticles/configs';
import {NgParticlesService, NgxParticlesModule} from '@tsparticles/angular';
import {loadSlim} from '@tsparticles/slim';
import {HomeContactComponent} from '../../home/home-contact/home-contact.component';
import {MenuCategoryComponent} from '../../menu/menu-category/menu-category.component';
import {MenuItemComponent} from '../../menu/menu-item/menu-item.component';
import {NgForOf} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-order-main',
  imports: [
    NgxParticlesModule,
    HomeContactComponent,
    MenuCategoryComponent,
    MenuItemComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './order-main.component.html',
  styleUrl: './order-main.component.scss'
})
export class OrderMainComponent implements OnInit {
  id = "tsparticles";
  particlesOptions: ISourceOptions = {
    ...configs.zIndex,
    background: {
      color: {
        value: "transparent"
      }
    },
  };
  constructor(private readonly ngParticlesService: NgParticlesService) {
  }

  ngOnInit() {
    this.generateParticles();
  }

  generateParticles(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }
}
