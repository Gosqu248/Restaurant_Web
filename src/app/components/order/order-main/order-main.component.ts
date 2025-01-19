import {Component, OnInit} from '@angular/core';
import type {Engine, ISourceOptions} from '@tsparticles/engine';
import configs from '@tsparticles/configs';
import {NgParticlesService, NgxParticlesModule} from '@tsparticles/angular';
import {loadSlim} from '@tsparticles/slim';

@Component({
  selector: 'app-order-main',
  imports: [
    NgxParticlesModule
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
        value: "#acabab"
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
