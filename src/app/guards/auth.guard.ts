import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const snackbar = inject(MatSnackBar)
  const authService = inject(AuthService);
  const router = inject(Router);
  const isLoggedIn = authService.isLoggedIn();
  const isAdmin = authService.isAdmin();


  if (isLoggedIn) {
    if (isAdmin) {
      return true; //admins yvelaferze true
    }
    else {
      if (state.url.includes('create/')) {
        snackbar.open('Only admin can edit users', '', { duration: 2000 })
      }
      else if (state.url.includes('view/')) {
        snackbar.open('Only admin can view profiles', '', { duration: 2000 })
      }
      else if(state.url === '/'){
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
