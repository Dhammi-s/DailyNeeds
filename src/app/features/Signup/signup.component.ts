import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'; // 👈 Import karo

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  registerData = {
    Name: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'User',
    serviceCategory: ''
  };

  isWorker = false;
  apiUrl = 'https://localhost:7046/api/auth/register';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService // 👈 Inject karo
  ) { }

  setRole(role: string) {
    this.registerData.role = role;
    this.isWorker = (role === 'Worker');
    if (!this.isWorker) this.registerData.serviceCategory = '';
  }

  onRegister() {
    this.http.post(this.apiUrl, this.registerData).subscribe({
      next: (res) => {
        this.toastr.success('Account Created Successfully!', 'Success');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Agar backend success message text vich bhej reha te status 200 hai
        if (err.status === 200) {
          this.toastr.success('Account Created Successfully!', 'Success');
          this.router.navigate(['/login']);
        } else {
          const errorMessage = err.error?.message || 'Something went wrong';
          this.toastr.error(errorMessage, 'Registration Error');
        }
      }
    });
  }
}
