import { Routes } from '@angular/router';
import { AuthService } from './modules/global/services/auth/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'signin',
    loadComponent: () => import('./modules/global/pages/signin/signin.component').then((m) => m.SigninComponent),
    canActivate: [AuthService]
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/global/pages/home/home.component').then((m) => m.HomeComponent),
    canActivate: [AuthService]
  },
  {
    path: 'products',
    loadComponent: () => import('./modules/global/pages/products/products.component').then((m) => m.ProductsComponent),
    canActivate: [AuthService]
  },
  {
    path: 'users',
    loadComponent: () => import('./modules/global/pages/users/users.component').then((m) => m.UsersComponent),
    canActivate: [AuthService]
  },
  {
    path: 'lots',
  loadComponent: () => import('./modules/global/pages/lots/lots.component').then((m) => m.LotsComponent),
    canActivate: [AuthService]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
