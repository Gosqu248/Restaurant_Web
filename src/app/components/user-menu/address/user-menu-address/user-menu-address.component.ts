import {Component, OnInit} from '@angular/core';
import {UserMenuMainComponent} from '../../user-menu-main/user-menu-main.component';
import {AuthService} from '../../../../services/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UserMenuAddAddressComponent} from '../user-menu-add-address/user-menu-add-address.component';
import {UserAddress} from '../../../../interfaces/user.address.interface';
import {UserMenuAddressChangeComponent} from '../user-menu-address-change/user-menu-address-change.component';
import {AddressService} from '../../../../services/address.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-menu-address',
  templateUrl: './user-menu-address.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrl: './user-menu-address.component.scss'
})
export class UserMenuAddressComponent implements OnInit{
  address: UserAddress | null = null;

  constructor(
    private authService: AuthService,
    private addressService: AddressService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UserMenuAddressComponent>,
  ) {}

  ngOnInit() {
   this.loadAddress()
  }

  loadAddress() {
    this.addressService.address$.subscribe((address) => {
      this.address = address;
    });
  }

  removeAddress() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      if (this.address?.id) {
        this.addressService.deleteAddress(jwt, this.address.id).subscribe({
          next: (response) => {
            console.log(response);
            this.loadAddress();
          },
          error: (error) => console.error(error)
        });
      } else {
        console.error("Something wrong with address");
      }
    } else {
      console.error("No token found");
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  backToMenuDialog() {
    this.closeDialog();
    this.dialog.open(UserMenuMainComponent);
  }

  openAddAddressDialog() {
    this.closeDialog();
    this.dialog.open(UserMenuAddAddressComponent);
  }

  goToChangeAddress() {
    this.dialogRef.close();
    this.dialog.open(UserMenuAddressChangeComponent, {
      data: { address: this.address },
    });
  }


}
