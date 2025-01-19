import {Component, OnDestroy, OnInit} from '@angular/core';
import {Menu} from '../../../interfaces/menu';
import type {Engine, ISourceOptions} from '@tsparticles/engine';
import configs from '@tsparticles/configs';
import {MenuService} from '../../../services/menu.service';
import {NgParticlesService, NgxParticlesModule} from '@tsparticles/angular';
import {loadSlim} from '@tsparticles/slim';
import {NgForOf, NgStyle} from '@angular/common';
import {MenuItemComponent} from '../menu-item/menu-item.component';
import {MenuCategoryComponent} from '../menu-category/menu-category.component';
import {Subject, takeUntil} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {GroupedMenuItems} from '../../../interfaces/grouped-menu-items';
import {MatDialog} from '@angular/material/dialog';
import {MenuDialogComponent} from '../menu-dialog/menu-dialog.component';
import {HomeContactComponent} from '../../home/home-contact/home-contact.component';
import {CartItem} from '../../../interfaces/cart-item';
import {CartService} from '../../../services/cart.service';
import {BasketMainComponent} from '../../basket/basket-main/basket-main.component';
import {CurrencyPLPipe} from '../../../pipes/currency-pl.pipe';

@Component({
  selector: 'app-menu-main',
  imports: [
    NgForOf,
    NgxParticlesModule,
    MenuItemComponent,
    MenuCategoryComponent,
    FormsModule,
    NgStyle,
    HomeContactComponent,
    CurrencyPLPipe,
  ],
  templateUrl: './menu-main.component.html',
  standalone: true,
  styleUrl: './menu-main.component.scss'
})
export class MenuMainComponent implements OnInit, OnDestroy {
  menus: Menu[] = [];
  private destroy$ = new Subject<void>();
  searchMenuItem: string = '';
  groupedMenuItems: GroupedMenuItems[] = [];
  images: string[] = [];
  currentImage: string = '';
  currentImageIndex: number = 0;
  cart: CartItem[] = [];
  totalPrice: number = 0;

  id = "tsparticles";
  particlesOptions: ISourceOptions = {
    ...configs.snow,
    background: {
      color: {
        value: "transparent"
      }
    },
  };

  constructor(private menuService: MenuService,
              private dialog: MatDialog,
              private cartService: CartService,
              private readonly ngParticlesService: NgParticlesService) {
  }

  ngOnInit(): void {
    this.loadMenus();
    this.loadCategoriesImage();
    this.cart = this.cartService.getCart();
    this.cartService.totalPrice$.subscribe(totalPrice => {
      this.totalPrice = totalPrice;
    });
    this.startImagesSlideShow();
    this.generateParticles();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


  loadMenus(): void {
    this.menuService.filteredMenus$
      .pipe(takeUntil(this.destroy$))
      .subscribe((menus) => {
        this.menus = menus;
        this.groupMenuItems(menus);
      });
  }

  loadCategoriesImage() {
    this.menuService.getImageFromCategories().subscribe((image) => {
      this.images = image;
      this.currentImage = this.images[0];
    });
  }

  openDialog(menu: Menu): void {
    this.dialog.open(MenuDialogComponent, {
      maxWidth: '100vw',
      height: 'auto',
      maxHeight: '100vh',
      data: {menu: menu}
    })
  }

  startImagesSlideShow(): void {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.currentImage = this.images[this.currentImageIndex];
    }, 3000);
  }


  filterMenus() {
    if (this.searchMenuItem !== '') {
      const filteredMenus = this.menus.filter((menu) => {
        return menu.name.toLowerCase().includes(this.searchMenuItem.toLowerCase());
      });
      this.groupMenuItems(filteredMenus);
    } else {
      this.groupMenuItems(this.menus);
    }
  }

  private groupMenuItems(menus: Menu[]) {
    const groupedMap = new Map<string, Menu[]>();

    menus.forEach((menu) => {
      if (!groupedMap.has(menu.category)) {
        groupedMap.set(menu.category, []);
      }
      groupedMap.get(menu.category)?.push(menu);
    });

    this.groupedMenuItems = Array.from(groupedMap.entries())
      .map(([category, items]) => ({
        category,
        items: items.sort((a, b) => a.name.localeCompare(b.name))
      }))
      .sort((a, b) => a.category.localeCompare(b.category));
  }
  generateParticles(): void {
     this.ngParticlesService.init(async (engine: Engine) => {
      await loadSlim(engine);
    });
  }

  openBasketDialog() {
    this.dialog.open(BasketMainComponent, {
      width: '600px',
      height: 'auto',
      panelClass: 'centered-dialog',
      disableClose: false,
      autoFocus: true,
    })
  }
}
