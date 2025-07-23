import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMainImageComponent } from './home-main-image.component';

describe('HomeMainImageComponent', () => {
  let component: HomeMainImageComponent;
  let fixture: ComponentFixture<HomeMainImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMainImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMainImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
