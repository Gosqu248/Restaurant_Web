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

  private userDataSubject = new BehaviorSubject<UserDTO | null>(null);
  public userData$ = this.userDataSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkAuthStatus();
    this.handleGoogleCallback();
  }

  private checkAuthStatus() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('jwt');
      if (token) {
        if (this.isTokenExpired(token)) {
          this.logout();
        } else {
          this.fetchUserData(token);
          this.isAuthenticatedSubject.next(true);
        }
      }
    }
  }

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
        this.fetchUserData(response.jwt);
        this.isAuthenticatedSubject.next(true);
      }),
      map(() => true),
      catchError(() => {
        this.isAuthenticatedSubject.next(false);
        return of(false);
      })
    );
  }

  initiateGoogleLogin(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = environment.api + '/oauth2/authorization/google';
    }
  }

  private handleGoogleCallback(): void {
    if (isPlatformBrowser(this.platformId)) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const error = urlParams.get('error');

      if (token) {
        localStorage.setItem('jwt', token);
        this.fetchUserData(token);
        this.isAuthenticatedSubject.next(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (error) {
        console.error('Google login error');
        this.isAuthenticatedSubject.next(false);
      }
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      this.userDataSubject.next(null);
      this.isAuthenticatedSubject.next(false);
    }
  }

  updateUserData(token: string, name: string, phoneNumber: string): Observable<string> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/updateData`, {name, phoneNumber}, {headers, responseType: 'text'}).pipe(
      tap(() => this.fetchUserData(token))
    );
  }

  changePassword(token: string, password: string, newPassword: string): Observable<boolean> {
    const headers = new HttpHeaders().set("Authorization", `Bearer ${token}`);
    return this.http.put<boolean>(`${this.apiUrl}/changePassword`, {password, newPassword}, {headers});
  }

  sendResetPasswordEmail(email: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email }, { responseType: 'text' })
      .pipe(
        map(response => {
          try {
            return JSON.parse(response);
          } catch (e) {
            return response;
          }
        }),
        catchError(error => {
          console.error('Error occurred while sending reset password email:', error);
          return throwError(() => new Error('An error occurred while sending the reset password email'));
        })
      );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirm-reset-password`, { token, newPassword });
  }


  private isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

}
