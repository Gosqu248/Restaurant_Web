import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHistoryMenuItemComponent } from './order-history-menu-item.component';

describe('OrderHistoryMenuItemComponent', () => {
  let component: OrderHistoryMenuItemComponent;
  let fixture: ComponentFixture<OrderHistoryMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderHistoryMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHistoryMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
