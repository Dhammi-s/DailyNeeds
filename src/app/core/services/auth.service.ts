import { Injectable } from '@angular/core';
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
    private cookieService: CookieService
  ) { }

  login(credentials: any): Observable<any> {

    return this.http.post<any>(
      `${this.apiUrl}/login`,
      credentials
    ).pipe(

      tap((res: any) => {

        if (res.token) {

          // Save Token
          this.cookieService.set(
            'token',
            res.token,
            1,
            '/'
          );

          // Decode JWT
          const decodedToken: any = jwtDecode(res.token);

          // Extract Role
          const role =
            decodedToken.role ||
            decodedToken.Role ||
            decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

          // Save Role
          this.cookieService.set(
            'userRole',
            role,
            1,
            '/'
          );

          // Save User Info
          if (res.user) {

            this.cookieService.set(
              'userInfo',
              JSON.stringify(res.user),
              1,
              '/'
            );
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

  }
}
