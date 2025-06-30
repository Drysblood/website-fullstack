import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // Observable für Komponenten
  public currentUser$ = this.currentUserSubject.asObservable();
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Beim Start prüfen ob Token vorhanden
    this.checkAuthStatus();
  }

  /**
   * Login Funktion - Direktes Django Backend
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    console.log('� Using Django Backend Authentication');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<LoginResponse>(`${this.apiUrl}/login/`, credentials, { headers })
      .pipe(
        tap(response => {
          // Token speichern
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          localStorage.setItem('user', JSON.stringify(response.user));
          
          // State aktualisieren
          this.currentUserSubject.next(response.user);
          this.isLoggedInSubject.next(true);
        })
      );
  }

  /**
   * Logout Funktion
   */
  logout(): void {
    // Token entfernen
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    
    // State zurücksetzen
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
    
    // Zur Login-Seite weiterleiten
    this.router.navigate(['/login']);
  }

  /**
   * Prüft ob User eingeloggt ist
   */
  private checkAuthStatus(): void {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
        this.isLoggedInSubject.next(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        this.logout();
      }
    }
  }

  /**
   * Gibt aktuellen User zurück
   */
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  /**
   * Prüft ob User eingeloggt ist (synchron)
   */
  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  /**
   * Gibt Access Token zurück
   */
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * HTTP Interceptor Helper - Headers mit Token
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getAccessToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  /**
   * Token Refresh (für HTTP Interceptor)
   */
  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post<any>(`${this.apiUrl}/refresh/`, { refresh })
      .pipe(
        tap(response => {
          localStorage.setItem('access_token', response.access);
        })
      );
  }

  /**
   * Debug Helper - gibt API URL zurück
   */
  getApiUrl(): string {
    return this.apiUrl;
  }

  /**
   * Benutzer-Daten aktualisieren (für Avatar-Updates)
   */
  refreshUserData(): void {
    const token = this.getAccessToken();
    if (!token) return;

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get(`${this.apiUrl}/profile/`, { headers }).subscribe({
      next: (userData: any) => {
        this.currentUserSubject.next(userData);
      },
      error: (error) => {
        console.error('Fehler beim Aktualisieren der Benutzerdaten:', error);
      }
    });
  }

  /**
   * Avatar-URL für aktuellen User abrufen
   */
  getCurrentUserAvatar(): string | null {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.avatar_url || null;
  }

  /**
   * Lädt User-Daten nach dem Login nach und speichert sie im LocalStorage
   */
  fetchUser(): Observable<any> {
    const token = this.getAccessToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
    return this.http.get<any>(`${this.apiUrl}/user/me/`, { headers }).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }
}
