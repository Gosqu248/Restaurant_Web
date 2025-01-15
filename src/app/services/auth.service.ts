import {EventEmitter, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, tap, throwError} from "rxjs";
import {isPlatformBrowser} from "@angular/common";
import {environment} from '../../enviorments/environment';
import {User, UserDTO} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.api + '/api/auth';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  loginEvent: EventEmitter<void> = new EventEmitter<void>();

  private userDataSubject = new BehaviorSubject<UserDTO | null>(null);
  public userData$ = this.userDataSubject.asObservable();

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  register(user: User): Observable<any> {
    return this.http.post<{message: string}>(`${this.apiUrl}/register`, user)
  }

  fetchUserData(token: string) {
    this.getUser(token).subscribe({
      next: user => this.userDataSubject.next(user),
      error: error => console.error('Error fetching user data', error)
    });
  }

  getUser(token: string): Observable<UserDTO> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.get<UserDTO>(`${this.apiUrl}/user`, {headers});
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/login`, {email, password}).pipe(
      map(response => {
        if (response) {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('email', email);
          }
          return true;
        }
        return false;
      }),
      map(() => true),
      catchError( (error: HttpErrorResponse) => {
        if (error.status === 423) {
          return throwError(() => new Error('Account is locked. Try again later.'));
        }
        return of(false);
      })
    );
  }

  verify2FA(code: string): Observable<boolean> {
    const email = localStorage.getItem('email');
    return this.http.post<{jwt: string}>(`${this.apiUrl}/verify-2fa`, {email, code}).pipe(
      tap(response => {
        localStorage.setItem('jwt', response.jwt);
        this.isAuthenticatedSubject.next(true);
        this.loginEvent.emit();
        this.fetchUserData(response.jwt);

      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/reset-password`, {email}).pipe(
      catchError(error => {
        if (error.status === 401) {
          return of({error: 'Email not found'});
        }
        return throwError(error);
      })
    )
  };



  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('name');
      localStorage.removeItem('email');

    }
    this.isAuthenticatedSubject.next(false);

  }

  changeUserName(token: string, name: string): Observable<string> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/changeName`, name, {headers, responseType: 'text'});
  }

  changePassword(token: string, password: string, newPassword: string): Observable<boolean> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.put<boolean>(`${this.apiUrl}/changePassword`, {password, newPassword}, {headers});
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('jwt');
    } else {
      return false;
    }
  }

  setAuth() {
    this.isAuthenticatedSubject.next(true);
  }
}
