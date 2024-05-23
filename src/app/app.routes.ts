import { Routes } from '@angular/router';
import {UserCreateComponent} from './components/user-create/user-create.component'
import { UsersComponent } from './components/users/users.component';
import { UserDetailedComponent } from './components/user-detailed/user-detailed.component';

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
    }
  ];