import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserMenuAddressComponent} from '../user-menu-address/user-menu-address.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../../services/address.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-menu-add-address',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './user-menu-add-address.component.html',
  standalone: true,
  styleUrl: './user-menu-add-address.component.scss'
})
export class UserMenuAddAddressComponent {
  addressForm: FormGroup;


  constructor(
    private addressService: AddressService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UserMenuAddAddressComponent>,
    private fb: FormBuilder,
  ) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      floorNumber: [' '],
      accessCode: [' '],
      zipCode: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  addAddress() {
    if (this.addressForm.valid) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        this.addressService.addAddress(jwt, this.addressForm.value).subscribe({
          next: response => {
            console.log(response);
            this.backToMenuAddressesDialog();
          },
          error: error => {
            console.error('Error adding address: ', error);
            alert('Prawdopodobnie podany adres jest nieprawidłowy. Spróbuj ponownie.');
          }
        });
      } else {
        console.error('No token found');
      }
    } else {
      console.error('Form is invalid');
    }
  }


  closeDialog() {
    this.dialogRef.close();
  }

  backToMenuAddressesDialog() {
    this.closeDialog();
    this.dialog.open(UserMenuAddressComponent);
  }


}
