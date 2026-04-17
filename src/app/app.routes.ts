import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: 'jassa', component: HomeComponent },
  { path: '', redirectTo: 'jassa', pathMatch: 'full' } // 👈 default redirect
];
