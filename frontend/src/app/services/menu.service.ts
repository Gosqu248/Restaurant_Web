import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, catchError, forkJoin, map, Observable, of, shareReplay, switchMap} from 'rxjs';
import {Menu} from '../interfaces/menu';
import {Category} from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly apiUrl = environment.api + '/api/menus';
  private readonly STORAGE_KEY = 'menus';

  private readonly menus: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(this.loadMenusFromStorage());
  private selectedCategory: BehaviorSubject<Category | null> = new BehaviorSubject<Category | null>(null);

  readonly menus$ = this.menus.asObservable();
  readonly filteredMenus$ = this.menus.pipe(
    switchMap(menus => this.selectedCategory.pipe(
      map(category => category
        ? menus.filter(menu => menu.category === category.name)
        : menus
      )
    )),
    shareReplay(1)
  )

  readonly selectedCategory$ = this.selectedCategory.asObservable();
  readonly categories$ = this.menus.pipe(
    map(this.extractCategories),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {
  }

  fetchMenus(): void {
    this.getAllMenus().pipe(
      switchMap(menus => this.loadMenuImages(menus)),
      catchError(error => {
        console.error('Error fetching menus:', error);
        return of(this.loadMenusFromStorage());
      })
    ).subscribe(menus => {
      this.menus.next(menus);
      this.saveMenusToStorage(menus);
    });
  }

  filterMenus(category: Category) {
    if (category.name !== this.selectedCategory.getValue()?.name) {
      this.selectedCategory.next(category);
    } else {
      this.selectedCategory.next(null);
    }
  }
  addMenu(menuData: FormData): Observable<Menu> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.post<Menu>(`${this.apiUrl}/add`, menuData, {headers});
  }
  updateMenu(id: number, formData: FormData) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.put<Menu>(`${this.apiUrl}/update/${id}`, formData, {headers});
  }

  deleteMenu(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('jwt')}`);
    return this.http.put<void>(`${this.apiUrl}/delete/${id}`, {headers});
  }

  getImageFromCategories() {
    return this.categories$.pipe(
      map(categories => categories
        .filter(category => category.imageUrl !== '')
        .map(category => category.imageUrl))
    )
  }


  findMenuById(id: number): Menu | null {
    return this.menus.getValue().find(menu => menu.id === id) || null;
  }

  private getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/getAll`);
  }


  private getMenuImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/image`, {responseType: 'blob'});
  }

  private loadMenuImages(menus: Menu[]): Observable<Menu[]> {
    const menuObservables = menus.map(menu => {
      if (menu.imageUrl) {
        return of(menu);
      }

      return this.getMenuImage(menu.id).pipe(
        map(image => ({
          ...menu,
          imageUrl: image.size > 0 ? URL.createObjectURL(image) : menu.imageUrl
        })),
        catchError(() => of(menu))
      );
    });

    return forkJoin(menuObservables);
  }

  private extractCategories(menus: Menu[]): Category[] {
    const categoryMap = new Map<string, string>();

    menus.forEach(menu => {
      if (!categoryMap.has(menu.category)) {
        categoryMap.set(menu.category, menu.imageUrl || '');
      }
    })

    return Array.from(categoryMap.entries()).map(([name, imageUrl]) => ({
      name,
      imageUrl
    }));
  }

  private loadMenusFromStorage(): Menu[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private saveMenusToStorage(menus: Menu[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(menus));
  }

  clearStorage() {
    localStorage.removeItem(this.STORAGE_KEY);
  }


}
