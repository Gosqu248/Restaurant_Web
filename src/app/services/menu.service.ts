import { Injectable } from '@angular/core';
import {environment} from '../../enviorments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, forkJoin, map, Observable, of, switchMap} from 'rxjs';
import {Menu} from '../interfaces/menu';
import {Category} from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = environment.api + '/api/menu';

  private menus: BehaviorSubject<Menu[]> = new BehaviorSubject<Menu[]>(this.loadMenusFromSessionStorage());
  menus$: Observable<Menu[]> = this.menus.asObservable();

  constructor(private http: HttpClient) { }

  fetchMenus(): void {
    this.getAllMenus().pipe(
      map(menus => {
        const menuRequests = menus.map(menu =>
         menu.imageUrl
          ? of(menu)
          : this.getMenuImage(menu.id).pipe(
              map(imageBlob => {
                menu.imageUrl = URL.createObjectURL(imageBlob);
                return menu;
              })
            )
        );
        return forkJoin(menuRequests);
      }),
      switchMap(observable => observable)
    ).subscribe({
      next: (menus: Menu[]) => {
        this.menus.next(menus);
        sessionStorage.setItem('menus', JSON.stringify(menus));
      },
      error: (error) => {
        console.error('Error fetching menus with images', error);
      }
    });
  }

  getCategories(): Category[] {
    const menus = this.menus.getValue();
    const categoriesSet = new Set<string>();

    menus.forEach(menu => categoriesSet.add(menu.category));

    return Array.from(categoriesSet).map(categoryName => {
      const categoryMenu = menus.find(menu => menu.category === categoryName);
      return {
        name: categoryName,
        imageUrl: categoryMenu?.imageUrl || ''
      }
    });
  }

  getAllMenus(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.apiUrl}/getAll`);
  }

  getMenuImage(id: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${id}/image`, {responseType: 'blob'});
  }

  addMenu(menuData: FormData): Observable<Menu> {
    return this.http.post<Menu>(`${this.apiUrl}/add`, menuData);
  }

  loadMenusFromSessionStorage(): Menu[] {
    return JSON.parse(sessionStorage.getItem('menus') || '[]');
  }

}
