import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { UserStateService } from '../services/user-state.service';

export const authGuard: CanActivateFn = (route, state) => {
  const snackbar = inject(MatSnackBar)
  const userStateService = inject(UserStateService);
  const router = inject(Router);
  const isLoggedIn = userStateService.isLoggedIn();
  const isAdmin = userStateService.isAdmin();
  const userId = userStateService.getUserId()

  if (isLoggedIn) {
    if (isAdmin) {
      return true; //admins yvelaferze true
    }
    else {
      if (state.url.includes('create/')) {
        snackbar.open('Only admin can edit users', '', { duration: 2000 })
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
// if (currentUser && currentUser.role === expectedRole) {
//   return true;
// } else {
//   router.navigate(['/login']);
//   return false;
// }
