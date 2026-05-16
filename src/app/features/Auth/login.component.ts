import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; // 👈 Toastr import karo
import { CookieService } from 'ngx-cookie-service'; // 👈 Cookie import karo

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

  siteKey = '6Lfi83ksAAAAADNkjVJ8JftlWyrugROii4xgvuYK';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService, // 👈 Inject karo
    private cookieService: CookieService // 👈 Inject karo
  ) { }

  onLogin(role: 'User' | 'Worker' | 'Admin') {
    const captchaResponse = grecaptcha.getResponse();

    if (!captchaResponse) {
      this.toastr.warning('Please complete the Captcha first!', 'Captcha Required');
      return;
    }

    this.loginData.captcha = captchaResponse;

    this.authService.login(this.loginData, role).subscribe({
      next: (response) => {
        if (response.token) {
          this.cookieService.set('token', response.token, 1, '/');
          this.cookieService.set('userRole', role, 1, '/');

          this.toastr.success(`Welcome back, ${role}!`, 'Login Successful');

          // 2. Role de hisab naal redirect karo
          if (role === 'Admin') this.router.navigate(['/admin-dashboard']);
          else if (role === 'Worker') this.router.navigate(['/worker-dashboard']);
          else this.router.navigate(['/jassa']);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        // Error handling with Toaster
        const errorMsg = err.error?.message || 'Invalid Email or Password';
        this.toastr.error(errorMsg, 'Login Failed');

        // Reset captcha on failure
        grecaptcha.reset();
      }
    });
  }
}
