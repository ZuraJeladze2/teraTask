import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { UserStateFacade } from '../facades/user-state.facade';
/**
 * Authentication guard function to determine if a route can be activated.
 * @param route The activated route snapshot.
 * @param state The router state snapshot.
 * @returns A boolean indicating whether the route can be activated.
 */
export const authGuard: CanActivateFn = (route, state) => {
  /**
   * Material snack bar service for displaying notifications.
   */
  const snackbar = inject(MatSnackBar);

  /**
   * User state facade for managing user state.
   */
  const userStateFacade = inject(UserStateFacade);

  /**
   * Angular router service for navigation.
   */
  const router = inject(Router);

  /**
   * Indicates whether the user is logged in.
   */
  const isLoggedIn = userStateFacade.isLoggedIn();

  /**
   * Indicates whether the user is an admin.
   */
  const isAdmin = userStateFacade.isAdmin();

  /**
   * The ID of the current user.
   */
  const userId = userStateFacade.getUserId();

  if (isLoggedIn) {
    if (isAdmin) {
      return true;
    } else {
      if (state.url.includes('create/') || state.url.includes('view/')) {
        if (state.url.includes(`create/${userId}`) || state.url.includes(`view/${userId}`)) {
          return true;
        } else {
          snackbar.open('No access', '', { duration: 2000 });
          router.navigateByUrl('');
          return false;
        }
      } else if (state.url === '/') {
        return true;
      }
      return false;
    }
  }

  router.navigate(['login']);
  return false;
};
