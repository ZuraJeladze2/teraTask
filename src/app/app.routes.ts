import { Routes } from '@angular/router';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailedComponent } from './pages/user-detailed/user-detailed.component';
import { UsersComponent } from './pages/users/users.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create',
    loadComponent: () => import('./pages/user-create/user-create.component').then(x => x.UserCreateComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(x => x.LoginComponent)
  },
  {
    path: 'create/:id',
    loadComponent: () => import('./pages/user-create/user-create.component').then(x => x.UserCreateComponent),
    canActivate: [authGuard]
  },
  {
    path: 'view/:id',
    loadComponent: () => import('./pages/user-detailed/user-detailed.component').then(x => x.UserDetailedComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];