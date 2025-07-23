import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuFavouriteComponent } from './user-menu-favourite.component';

describe('UserMenuFavouriteComponent', () => {
  let component: UserMenuFavouriteComponent;
  let fixture: ComponentFixture<UserMenuFavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuFavouriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuFavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
