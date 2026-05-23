import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://dailyneedsbackend.runasp.net/api/auth';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  getUserIdFromToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    // First: try localStorage (most reliable)
    const localUserId = localStorage.getItem('userId');

    if (localUserId) return localUserId;

    // Fallback: decode JWT token directly
    const token = this.getToken();
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded token claims:', decodedToken);

      const userId = decodedToken.userId ||
        decodedToken.id ||
        decodedToken.sub ||
        decodedToken.nameid ||
        decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
        null;

      // Cache it in localStorage for next time
      if (userId) localStorage.setItem('userId', userId);

      return userId;
    } catch (error) {
      console.error('Error decoding JWT Token:', error);
      return null;
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        if (res.token) {
          this.cookieService.set('token', res.token, 1, '/');
          const decodedToken: any = jwtDecode(res.token);
          const role = decodedToken.role || decodedToken.Role || decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          this.cookieService.set('userRole', role, 1, '/');

          if (res.user) {
            this.cookieService.set('userInfo', JSON.stringify(res.user), 1, '/');
          } else if (res.userId) {
            this.cookieService.set('userInfo', JSON.stringify({ userId: res.userId }), 1, '/');
          }
        }

      })
    );
  }

  getToken(): string {
    return this.cookieService.get('token');
  }

  getRole(): string {
    return this.cookieService.get('userRole');
  }

  logout() {
    this.cookieService.delete('token', '/');
    this.cookieService.delete('userRole', '/');
    this.cookieService.delete('userInfo', '/');
    this.cookieService.deleteAll('/');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userId');
    }
  }
}
