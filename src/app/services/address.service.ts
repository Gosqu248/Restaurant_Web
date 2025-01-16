import { Injectable } from '@angular/core';
import {environment} from '../../enviorments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserAddress} from '../interfaces/user.address.interface';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private apiUrl = environment.api + '/api/address';

  constructor(private http: HttpClient) { }

  getAddresses(token: string): Observable<UserAddress> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<UserAddress>(`${this.apiUrl}/get`, {headers});
  }

  addAddress(token: string, address: UserAddress) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/add`, address, {headers});
  }

  updateAddress(token: string, address: UserAddress) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/update`, address, {headers});
  }

  deleteAddress(token: string, addressId: number) {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/delete?addressId=${addressId}`, {headers});
  }

}
