import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service'; // 👈 Eh import check karo

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7046/api/auth';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService // 👈 CookieService inject kiti
  ) { }

  login(credentials: any, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { ...credentials, role }).pipe(
      tap((res: any) => {
        if (res.token) {
          // LocalStorage khatam, hun sab Cookies vich jayega
          // Parameters: (name, value, expires, path)
          this.cookieService.set('token', res.token, 1, '/');
          this.cookieService.set('userRole', role, 1, '/');

          // Je backend ton user details vi aa rahiya ne
          if (res.user) {
            this.cookieService.set('userInfo', JSON.stringify(res.user), 1, '/');
          }
        }
      })
    );
  }

  // Cookies read karan lyi helper functions
  getToken(): string {
    return this.cookieService.get('token');
  }

  getRole(): string {
    return this.cookieService.get('userRole');
  }

  // Logout function cookies clear karan lyi
  logout() {
    this.cookieService.delete('token', '/');
    this.cookieService.delete('userRole', '/');
    this.cookieService.deleteAll('/');
  }
}
