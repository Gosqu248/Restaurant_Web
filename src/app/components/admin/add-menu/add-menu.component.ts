import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MenuService } from '../../../services/menu.service';

declare var particlesJS: any;

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./add-menu.component.scss']
})
export class AddMenuComponent implements OnInit {
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
    private http: HttpClient
  ) {
    this.menuForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      ingredients: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.http.get('assets/config/particlesjs-config.json').subscribe((config) => {
      particlesJS('particles-js', config);
    });
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
        price: this.menuForm.get('price')?.value
      };
      formData.append('menu', new Blob([JSON.stringify(menuData)], { type: 'application/json' }));

      const imageFile = this.menuForm.get('image')?.value;
      if (imageFile) {
        formData.append('image', imageFile);
      }

      this.menuService.addMenu(formData).subscribe({
        next: (response) => {
          console.log('Menu added successfully', response);
          this.menuForm.reset();
          this.previewImage = null;
        },
        error: (error) => {
          console.error('Error adding menu', error);
        }
      });
    }
  }

}
