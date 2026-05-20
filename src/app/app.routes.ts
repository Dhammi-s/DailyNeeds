import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/Auth/login.component'; // Import zaroor check karna
import { SignupComponent } from './features/Signup/signup.component';
import { DashboardManager } from './features/UserPortalPages/dashboard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },  // URL: http://localhost:4200/login
  { path: 'home', component: HomeComponent },    // URL: http://localhost:4200/home
  { path: 'jassa', component: HomeComponent },   // URL: http://localhost:4200/jassa
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardManager },   // URL: http://localhost:4200/dashboard

  // Default page kera rkhna? Login rkhna vdia rehnda:
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
