import {Component, OnInit} from '@angular/core';
import {NgParticlesService, NgxParticlesModule} from "@tsparticles/angular";
import type {Engine, ISourceOptions} from '@tsparticles/engine';
import configs from '@tsparticles/configs';

import {loadSlim} from '@tsparticles/slim';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {MonitorOrderItemComponent} from '../monitor-order-item/monitor-order-item.component';
import {AdminOrderDTO, OrderDTO} from '../../../../interfaces/order';
import {OrderService} from '../../../../services/order.service';

@Component({
  selector: 'app-order-monitoring-main',
  imports: [
    NgxParticlesModule,
    MatProgressSpinner,
    NgIf,
    NgForOf,
    MonitorOrderItemComponent
  ],
  templateUrl: './order-monitoring-main.component.html',
  styleUrl: './order-monitoring-main.component.scss',
  providers: [DatePipe]
})
export class OrderMonitoringMainComponent implements OnInit {
  orders: AdminOrderDTO[] = [];

  id = "tsparticles";
  particlesOptions: ISourceOptions = {
    ...configs.slow,
    background: {
      color: {
        value: "transparent"
      }
    },
  };
  isLoading: boolean = true;

  constructor(private orderService: OrderService,
              private readonly ngParticlesService: NgParticlesService) {
  }

  ngOnInit(): void {
    this.loadOrders();
    this.generateParticles();
  }

  loadOrders() {
    const token = localStorage.getItem('jwt');
    if (!token) {
      console.error('No token found');
      return;
    }

    this.orderService.getAllOrders(token).subscribe({
      next: (orders) => {
        this.orders = orders;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error getting user orders:', error);
      }
    });

  }

  generateParticles(): void {
    this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }
}
