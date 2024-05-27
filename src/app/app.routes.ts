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
      component: UserCreateComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'create/:id',
      component: UserCreateComponent,
      canActivate: [authGuard]
    },
    {
      path: 'view/:id',
      component: UserDetailedComponent,
      canActivate: [authGuard]
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];