import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryMainComponent } from './order-history-main.component';

describe('OrderHistoryMainComponent', () => {
  let component: OrderHistoryMainComponent;
  let fixture: ComponentFixture<OrderHistoryMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHistoryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
