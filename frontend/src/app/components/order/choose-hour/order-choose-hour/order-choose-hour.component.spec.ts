import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderChooseHourComponent } from './order-choose-hour.component';

describe('OrderChooseHourComponent', () => {
  let component: OrderChooseHourComponent;
  let fixture: ComponentFixture<OrderChooseHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderChooseHourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderChooseHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
