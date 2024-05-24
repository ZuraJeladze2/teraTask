import { Routes } from '@angular/router';
import {UserCreateComponent} from './pages/user-create/user-create.component'
import { UsersComponent } from './pages/users/users.component';
import { UserDetailedComponent } from './pages/user-detailed/user-detailed.component';
import { Page404Component } from './pages/page404/page404.component';

export const routes: Routes = [
    {
      path: '',
      component: UsersComponent
    },
    {
      path: 'create',
      component: UserCreateComponent
    },
    {
      path: 'create/:id',
      component: UserCreateComponent
    },
    {
      path: 'view/:id',
      component: UserDetailedComponent
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];