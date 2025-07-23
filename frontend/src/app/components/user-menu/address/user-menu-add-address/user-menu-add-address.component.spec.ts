import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuAddAddressComponent } from './user-menu-add-address.component';

describe('UserMenuAddAddressComponent', () => {
  let component: UserMenuAddAddressComponent;
  let fixture: ComponentFixture<UserMenuAddAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuAddAddressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuAddAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
