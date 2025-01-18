import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {Category} from '../../../interfaces/category';
import {MenuService} from '../../../services/menu.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-menu-category',
  imports: [
    NgForOf
  ],
  templateUrl: './menu-category.component.html',
  standalone: true,
  styleUrl: './menu-category.component.scss'
})
export class MenuCategoryComponent implements OnInit, OnDestroy{
  categories: Category[] = [];
  selectedCategory: Category | null = null;
  private destroy$ = new Subject<void>();
  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.loadCategories();
    this.setSelectedCategory();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadCategories(): void {
    this.menuService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => this.categories = categories);
  }

  setSelectedCategory() {
    this.menuService.selectedCategory$
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => this.selectedCategory = category);
  }

  filterMenu(category: Category) {
    this.menuService.filterMenus(category);
  }

}
