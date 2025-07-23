import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuMainComponent } from './user-menu-main.component';

describe('UserMenuMainComponent', () => {
  let component: UserMenuMainComponent;
  let fixture: ComponentFixture<UserMenuMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
