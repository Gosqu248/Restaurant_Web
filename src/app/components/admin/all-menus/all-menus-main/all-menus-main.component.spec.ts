import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMenusMainComponent } from './all-menus-main.component';

describe('AllMenusMainComponent', () => {
  let component: AllMenusMainComponent;
  let fixture: ComponentFixture<AllMenusMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMenusMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMenusMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
