import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuAddressChangeComponent } from './user-menu-address-change.component';

describe('UserMenuAddressChangeComponent', () => {
  let component: UserMenuAddressChangeComponent;
  let fixture: ComponentFixture<UserMenuAddressChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuAddressChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuAddressChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
