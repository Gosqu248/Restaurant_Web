import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLoginComponent } from './order-login.component';

describe('OrderLoginComponent', () => {
  let component: OrderLoginComponent;
  let fixture: ComponentFixture<OrderLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
