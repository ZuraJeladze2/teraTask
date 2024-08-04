import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { MainComponent } from './pages/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard] // Protects access to this route with the authGuard
  },
  {
    // Path for the default page (users list)
    path: 'users',
    component: UsersComponent,
    canActivate: [authGuard] // Protects access to this route with the authGuard
  },
  {
    // Path for creating a new user
    path: 'create',
    // Lazy loading of the UserCreateComponent
    loadComponent: () => import('./pages/user-create/user-create.component').then(x => x.UserCreateComponent)
  },
  {
    // Path for updating an existing user by ID
    path: 'create/:id',
    // Lazy loading of the UserCreateComponent
    loadComponent: () => import('./pages/user-create/user-create.component').then(x => x.UserCreateComponent),
    canActivate: [authGuard] // Protects access to this route with the authGuard
  },
  {
    // Path for viewing details of a user by ID
    path: 'view/:id',
    // Lazy loading of the UserDetailedComponent
    loadComponent: () => import('./pages/user-detailed/user-detailed.component').then(x => x.UserDetailedComponent),
    canActivate: [authGuard] // Protects access to this route with the authGuard
  },
  {
    // Path for logging in
    path: 'login',
    // Lazy loading of the LoginComponent
    loadComponent: () => import('./pages/login/login.component').then(x => x.LoginComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(x => x.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(x => x.ContactComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(x => x.NotFoundComponent)
  }
];
