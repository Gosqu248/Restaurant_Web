import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {UserAddress} from '../interfaces/user.address.interface';
import {BehaviorSubject, catchError, Observable, of, tap} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = environment.api + '/api/users/addresses';

  private addressSubject = new BehaviorSubject<UserAddress | null>(null);
  address$ = this.addressSubject.asObservable();
  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        const token = localStorage.getItem('jwt');
        if (token) {
          this.getAddresses(token).subscribe({
            next: address => {
              this.setAddresses(address);
            },
            error: error => {
              console.error('Error fetching addresses: ', error);
            }
          });
        }
      }
    });
  }
  private setAddresses(address: UserAddress | null): void {
    this.addressSubject.next(address);
  }

  private refreshAddresses(token: string): void {
    this.getAddresses(token).subscribe(addresses => this.setAddresses(addresses));
  }

  private getAddresses(token: string): Observable<UserAddress | null> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<UserAddress>(`${this.apiUrl}/get`, {headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null);
        }
        return of(null);
      })
    );
  }


  addAddress(token: string, address: UserAddress): Observable<boolean> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.post<boolean>(`${this.apiUrl}/add`, address, {headers}).pipe(
      tap(() => this.refreshAddresses(token))
    );
  }

  updateAddress(token: string, address: UserAddress): Observable<boolean> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.put<boolean>(`${this.apiUrl}/update`, address, {headers}).pipe(
      tap(() => this.refreshAddresses(token))
    );
  }

  deleteAddress(token: string, addressId: number): Observable<boolean> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.delete<boolean>(`${this.apiUrl}/delete?addressId=${addressId}`, {headers}).pipe(
      tap(() => this.refreshAddresses(token))
    );
  }



}
