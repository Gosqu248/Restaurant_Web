import {Component, Inject, Input} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserMenuAddressComponent} from '../user-menu-address/user-menu-address.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AddressService} from '../../../../services/address.service';
import {UserAddress} from '../../../../interfaces/user.address.interface';

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
  isEditMode: boolean = false;
  address: UserAddress = {} as UserAddress;

  constructor(
    private addressService: AddressService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<UserMenuAddAddressComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { address: UserAddress, isEditMode: boolean },
    private fb: FormBuilder,
  ) {
    this.isEditMode = data.isEditMode;
    this.address = data.address;

    this.addressForm = this.fb.group({
      street: [this.address?.street || '', Validators.required],
      houseNumber: [this.address?.houseNumber || '', Validators.required],
      floorNumber: [this.address?.floorNumber || ''],
      accessCode: [this.address?.accessCode || ''],
      zipCode: [this.address?.zipCode || '', Validators.required],
      city: [this.address?.city || '', Validators.required],
    });

  }

  onSubmit() {
    if (this.addressForm.valid) {
      const jwt = localStorage.getItem('jwt');

      if (jwt) {
        if (this.isEditMode && this.address?.id) {
          this.addressService.updateAddress(jwt, this.addressForm.value).subscribe({
            next: () => this.backToMenuAddressesDialog(),
            error: error => {
              console.error('Error updating address: ', error);
              alert('Prawdopodobnie podany adres jest nieprawidłowy. Spróbuj ponownie.');
            }
          });
        } else {
          this.addressService.addAddress(jwt, this.addressForm.value).subscribe({
            next: () => this.backToMenuAddressesDialog(),
            error: error => {
              console.error('Error adding address: ', error);
              alert('Prawdopodobnie podany adres jest nieprawidłowy. Spróbuj ponownie.');
            }
          });
        }
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
