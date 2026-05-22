import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/Auth/login.component';
import { SignupComponent } from './features/Signup/signup.component';
import { DashboardManager } from './features/UserPortalPages/dashboard';
// Navin Worker Dashboard Component import karo (apne exact folder structure mutabik path check kar lavo)
import { WorkerDashboardComponent } from './features/Workerdashboard/worker-dashboard.component';
import { WorkerProfileComponent } from './features/Workerdashboard/WorkerProfile/worker-profile.component';


export const routes: Routes = [
  // 1. Default Route: Jado koi srf localhost:4200 khole, oh login te chala jave
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // 2. Auth Routes
  { path: 'login', component: LoginComponent },  // URL: http://localhost:4200/login
  { path: 'signup', component: SignupComponent },

  // 3. Portal & Home Routes
  { path: 'home', component: HomeComponent },    // URL: http://localhost:4200/home
  { path: 'jassa', component: HomeComponent },   // URL: http://localhost:4200/jassa
  { path: 'dashboard', component: DashboardManager },   // URL: http://localhost:4200/dashboard

  // 4. Worker Portal Route (Navaan add kita)
  { path: 'worker-dashboard', component: WorkerDashboardComponent }, // URL: http://localhost:4200/worker-dashboard
  { path: 'worker-profile', component: WorkerProfileComponent }, // URL: http://localhost:4200/worker-profile
  { path: '**', redirectTo: 'login' }
];
