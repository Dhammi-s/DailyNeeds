import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/Auth/login.component'; // Import zaroor check karna
import { SignupComponent } from './features/Signup/signup.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },  // URL: http://localhost:4200/login
  { path: 'home', component: HomeComponent },    // URL: http://localhost:4200/home
  { path: 'jassa', component: HomeComponent },   // URL: http://localhost:4200/jassa
  { path: 'signup', component: SignupComponent },   // URL: http://localhost:4200/jassa

  // Default page kera rkhna? Login rkhna vdia rehnda:
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
