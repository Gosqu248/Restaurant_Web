import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMenusItemComponent } from './all-menus-item.component';

describe('AllMenusItemComponent', () => {
  let component: AllMenusItemComponent;
  let fixture: ComponentFixture<AllMenusItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMenusItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllMenusItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
