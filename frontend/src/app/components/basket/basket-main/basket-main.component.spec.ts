import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketMainComponent } from './basket-main.component';

describe('BasketMainComponent', () => {
  let component: BasketMainComponent;
  let fixture: ComponentFixture<BasketMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
