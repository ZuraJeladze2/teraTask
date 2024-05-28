import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { UserStateFacade } from '../facades/user-state.facade';

export const authGuard: CanActivateFn = (route, state) => {
  const snackbar = inject(MatSnackBar)
  const userStateFacade = inject(UserStateFacade);
  const router = inject(Router);
  const isLoggedIn = userStateFacade.isLoggedIn();
  const isAdmin = userStateFacade.isAdmin();
  const userId = userStateFacade.getUserId()

  if (isLoggedIn) {
    if (isAdmin) {
      return true; //admins yvelaferze true
    }
    else {
      if (state.url.includes('create/')) {
        if (state.url.includes(`create/${userId}`)) {
          return true
        }
        else {
          snackbar.open('Only admin can edit users', '', { duration: 2000 })
        }
      }
      else if (state.url.includes('view/')) {
        if (state.url.includes(`view/${userId}`)) {
          return true
        }
        else {
          snackbar.open('Only admin can view profiles', '', { duration: 2000 })
        }
      }
      else if (state.url === '/') {
        return true;
      }
      // router.navigateByUrl('')
      return false;
    }
  }

  router.navigate(['login'])
  return false;

};