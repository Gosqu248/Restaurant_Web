import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MenuService} from '../../../../services/menu.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./edit-menu.component.scss']
})
export class EditMenuComponent implements OnInit {
  menuForm: FormGroup;
  previewImage: string | ArrayBuffer | null | undefined = null;

  categories = [
    'Dania główne',
    'Pizza',
    'Burgery',
    'Kanapki i Wrapy',
    'Frytki',
    'Napoje',
    'Desery',
    'Sałatki',
    'Sosy i dodatki'
  ];

  constructor(
    private fb: FormBuilder,
    private menuService: MenuService,
    public dialogRef: MatDialogRef<EditMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      ingredients: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [null],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.menuForm.patchValue({
        name: this.data.name,
        category: this.data.category,
        ingredients: this.data.ingredients,
        price: this.data.price,
        imageUrl: this.data.imageUrl.startsWith('blob:') ? '' : this.data.imageUrl
      });
      this.previewImage = this.data.imageUrl || null;
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.previewImage = e.target?.result;
      };
      reader.readAsDataURL(file);

      this.menuForm.patchValue({ image: file });
      this.menuForm.get('image')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.menuForm.valid) {
      const formData = new FormData();
      const menuData = {
        name: this.menuForm.get('name')?.value,
        category: this.menuForm.get('category')?.value,
        ingredients: this.menuForm.get('ingredients')?.value,
        price: this.menuForm.get('price')?.value,
        imageUrl: this.menuForm.get('imageUrl')?.value
      };
      formData.append('menu', new Blob([JSON.stringify(menuData)], { type: 'application/json' }));

      const imageFile = this.menuForm.get('image')?.value;
      if (imageFile) {
        formData.append('image', imageFile);
      }

      this.menuService.updateMenu(this.data.id, formData).subscribe({
        next: () => {
          this.menuService.fetchMenus();
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Error updating menu', error);
        }
      });
    }
  }
}
