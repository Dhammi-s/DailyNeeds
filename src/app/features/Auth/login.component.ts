import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

declare var grecaptcha: any;

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule]
})
export class LoginComponent {

  loginData = {
    email: '',
    password: '',
    captcha: ''
  };
  siteKey = '6Le4ufgsAAAAABEABRBzF6kfxacUKqU9URXng65V'; // prod key

  //siteKey = '6Lfi83ksAAAAADNkjVJ8JftlWyrugROii4xgvuYK';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private cookieService: CookieService
  ) { }

  onLogin() {

    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {

      this.toastr.warning(
        'Please complete the Captcha first!',
        'Captcha Required'
      );

      return;
    }

    this.loginData.captcha = captchaResponse;

    this.authService.login(this.loginData).subscribe({

      next: (response) => {

        if (response.token) {

          // Save Token
          this.cookieService.set(
            'token',
            response.token,
            1,
            '/'
          );

          // Decode Token
          const decodedToken: any = jwtDecode(response.token);

          console.log(decodedToken);

          // Extract UserId
          const userId =
            decodedToken.userId ||
            decodedToken.id ||
            decodedToken.sub ||
            decodedToken.nameid ||
            decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

          // Save UserId
          if (userId) {
            this.cookieService.set('userId', userId, 1, '/');
          }

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

          this.toastr.success(
            `Welcome back, ${role}!`,
            'Login Successful'
          );

          // Redirect by Role
          if (role === 'Admin') {

            this.router.navigate(['/admin-dashboard']);

          }
          else if (role === 'Worker') {

            this.router.navigate(['/worker-dashboard']);

          }
          else if (role === 'User') {

            this.router.navigate(['/dashboard']);

          }
          else {

            this.toastr.error(
              'Invalid role found in token',
              'Access Denied'
            );
          }
        }
      },

      error: (err) => {

        console.error('Login failed', err);

        const errorMsg =
          err.error?.message ||
          'Invalid Email or Password';

        this.toastr.error(
          errorMsg,
          'Login Failed'
        );

        grecaptcha.reset();
      }
    });
  }
}
