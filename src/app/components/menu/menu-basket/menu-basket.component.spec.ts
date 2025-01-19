import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBasketComponent } from './menu-basket.component';

describe('MenuBasketComponent', () => {
  let component: MenuBasketComponent;
  let fixture: ComponentFixture<MenuBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBasketComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
