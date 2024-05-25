import { Routes } from '@angular/router';
import { UserCreateComponent } from './pages/user-create/user-create.component';
import { UserDetailedComponent } from './pages/user-detailed/user-detailed.component';
import { UsersComponent } from './pages/users/users.component';

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