import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuChangePasswordComponent } from './user-menu-change-password.component';

describe('UserMenuChangePasswordComponent', () => {
  let component: UserMenuChangePasswordComponent;
  let fixture: ComponentFixture<UserMenuChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuChangePasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
