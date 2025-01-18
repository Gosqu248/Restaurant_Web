import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Menu} from '../../../interfaces/menu';
import {MatButton} from '@angular/material/button';
import {CurrencyPLPipe} from '../../../pipes/currency-pl.pipe';

@Component({
  selector: 'app-menu-dialog',
  standalone: true,

  imports: [
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    CurrencyPLPipe
  ],
  templateUrl: './menu-dialog.component.html',
  styleUrl: './menu-dialog.component.scss'
})
export class MenuDialogComponent implements OnInit {
  menu: Menu = {} as Menu;
  quantity: number = 1;

  constructor(private dialogRef: MatDialogRef<MenuDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { menu: Menu}) { }

  ngOnInit() {
    this.menu = this.data.menu;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  onAddToCart(): void {
    // Implement your add to cart logic here
    this.dialogRef.close();
  }

  addQuantity(): void {
    this.quantity++;
  }

  removeQuantity(): void {
    this.quantity > 1 ? this.quantity-- : null
  }

}
