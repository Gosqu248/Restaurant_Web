import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Category} from '../../../interfaces/category';
import {MenuService} from '../../../services/menu.service';
import {Subject, takeUntil} from 'rxjs';

@Component({
  selector: 'app-menu-category',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './menu-category.component.html',
  standalone: true,
  styleUrl: './menu-category.component.scss'
})
export class MenuCategoryComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('categoriesContainer') categoriesContainer!: ElementRef;

  categories: Category[] = [];
  selectedCategory: Category | null = null;
  showLeftButton = false;
  showRightButton = false;
  private destroy$ = new Subject<void>();

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.categories$
      .pipe(takeUntil(this.destroy$))
      .subscribe((categories) => {
        this.categories = categories;
        setTimeout(() => this.checkScrollButtons(), 0);
      });

    this.menuService.selectedCategory$
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => this.selectedCategory = category);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.checkScrollButtons();
  }

  filterMenu(category: Category) {
    this.menuService.filterMenus(category);
  }

  scroll(direction: 'left' | 'right') {
    if (this.categories.length <= 1) return;

    const container = this.categoriesContainer.nativeElement;
    const scrollAmount = 250;

    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
    this.checkScrollButtons();
  }

  checkScrollButtons() {
    if (!this.categoriesContainer) return;

    const container = this.categoriesContainer.nativeElement;

    if (this.categories.length <= 1) {
      this.showLeftButton = false;
      this.showRightButton = false;
      return;
    }

    requestAnimationFrame(() => {
      const isOverflowing = container.scrollWidth > container.clientWidth;

      this.showLeftButton = isOverflowing && container.scrollLeft > 0;
      this.showRightButton = isOverflowing &&
        container.scrollLeft < (container.scrollWidth - container.clientWidth);
    });
  }
}
