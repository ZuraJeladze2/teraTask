import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const roleGuard: CanActivateFn = (route, state) => {
  const snackbar = inject(MatSnackBar)
  const authService = inject(AuthService);
  const router = inject(Router);
  const isAdmin = authService.isAdmin();

  if (isAdmin) {
    return true
  } else {
    console.log(route, state);
    if (state.url.includes('create/')) {
      snackbar.open('Only admin can edit users', '', { duration: 2000 })
    }
    else if(state.url.includes('view/')) {
      snackbar.open('Only admin can view profiles', '', { duration: 2000 })
    }
    router.navigateByUrl('')
  }
  return isAdmin;

  // if (currentUser && currentUser.role === expectedRole) {
  //   return true;
  // } else {
  //   router.navigate(['/login']);
  //   return false;
  // }
};
