import { Routes } from '@angular/router';
import { notReturnLoginGuard } from './core/guards/not-return-login-guard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { pathMatch: 'full', path: '', redirectTo: 'products', title: 'Products' },
  {
    path: 'products',
    title: 'Products',
    loadComponent: () => import('./core/pages/products/products').then((c) => c.Products),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    title: 'login',
    loadComponent: () => import('./core/pages/auth/login/login').then((c) => c.Login),
    canActivate: [notReturnLoginGuard],
  },

  {
    path: '**',
    title: 'NotFound',
    loadComponent: () =>
      import('./core/layout/not-found/not-found').then((c) => c.NotFound),
  },
];
