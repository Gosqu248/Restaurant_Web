import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuAddressComponent } from './user-menu-address.component';

describe('UserMenuAddressComponent', () => {
  let component: UserMenuAddressComponent;
  let fixture: ComponentFixture<UserMenuAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
