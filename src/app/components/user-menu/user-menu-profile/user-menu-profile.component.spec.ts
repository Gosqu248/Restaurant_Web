import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuProfileComponent } from './user-menu-profile.component';

describe('UserMenuProfileComponent', () => {
  let component: UserMenuProfileComponent;
  let fixture: ComponentFixture<UserMenuProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
