import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMonitoringMainComponent } from './order-monitoring-main.component';

describe('OrderMonitoringMainComponent', () => {
  let component: OrderMonitoringMainComponent;
  let fixture: ComponentFixture<OrderMonitoringMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderMonitoringMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMonitoringMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
