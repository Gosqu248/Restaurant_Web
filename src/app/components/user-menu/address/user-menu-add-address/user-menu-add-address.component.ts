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
    NgIf
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
      phoneNumber: ['',
        [Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^\d{9}$/)
        ]]
    });
  }

  addAddress() {
    if (this.addressForm.valid) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        this.addressService.addAddress(jwt, this.addressForm.value).subscribe({
          next: response => {
            console.log('Address added successfully', response);
            this.backToMenuAddressesDialog();
          },
          error: error => {
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

  showErrorFor(controlName: string): boolean {
    const control = this.addressForm.get(controlName);
    if (controlName === 'phoneNumber') {
      const phoneNumberPattern = /^\d{3} \d{3} \d{3}$/;
      return control ? control.invalid && (control.dirty || control.touched) && !phoneNumberPattern.test(control.value) : false;
    } else {
      return control ? control.invalid && (control.dirty || control.touched) : false;
    }
  }
}
