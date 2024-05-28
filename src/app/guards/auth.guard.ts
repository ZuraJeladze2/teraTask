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
      return true;
    }
    else {
      if (state.url.includes('create/') || state.url.includes('view/')) {
        if (state.url.includes(`create/${userId}`) || state.url.includes(`view/${userId}`)) {
          return true
        }
        else {
          snackbar.open('No access', '', { duration: 2000 })
          router.navigateByUrl('')
          return false;
        }
      }
      else if (state.url === '/') {
        return true;
      }
      return false;
    }
  }

  router.navigate(['login'])
  return false;
};