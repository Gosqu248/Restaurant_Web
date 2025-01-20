import {Component, OnInit} from '@angular/core';
import type {Engine, ISourceOptions} from '@tsparticles/engine';
import configs from '@tsparticles/configs';
import {NgParticlesService, NgxParticlesModule} from '@tsparticles/angular';
import {loadSlim} from '@tsparticles/slim';
import {ReactiveFormsModule} from '@angular/forms';
import {OrderLoginComponent} from '../order-login/order-login.component';
import {AuthService} from '../../../services/auth.service';
import {NgIf} from '@angular/common';
import {OrderChooseHourComponent} from '../choose-hour/order-choose-hour/order-choose-hour.component';
import {OrderPaymentComponent} from '../payment/order-payment/order-payment.component';
import {OrderCommentComponent} from '../order-comment/order-comment.component';
import {OrderBasketComponent} from '../basket/order-basket/order-basket.component';

@Component({
  selector: 'app-order-main',
  imports: [
    NgxParticlesModule,
    ReactiveFormsModule,
    OrderLoginComponent,
    NgIf,
    OrderChooseHourComponent,
    OrderPaymentComponent,
    OrderCommentComponent,
    OrderBasketComponent
  ],
  templateUrl: './order-main.component.html',
  styleUrl: './order-main.component.scss'
})
export class OrderMainComponent implements OnInit {
  isAuth: boolean = false;

  id = "tsparticles";
  particlesOptions: ISourceOptions = {
    ...configs.zIndex,
    background: {
      color: {
        value: "transparent"
      }
    },
  };
  constructor(private readonly ngParticlesService: NgParticlesService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loadAuth();
    this.generateParticles();
  }

  loadAuth() {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }

  generateParticles(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }
}
