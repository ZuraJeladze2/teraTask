import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
/**
 * Facade service for managing user-related state.
 * @remarks This service provides methods for setting and retrieving the current user, as well as checking user roles and authentication status.
 */
@Injectable({
  providedIn: 'root'
})
export class UserStateFacade {
  /**
   * Subject for managing the current user state.
   */
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  /**
   * Observable representing the current user state.
   */
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  /**
   * Router instance for navigation.
   */
  router = inject(Router)

  /**
   * MatSnackBar instance for displaying snack bar messages.
   */
  snackbar = inject(MatSnackBar)

  /**
   * Initializes the facade service and loads the user from local storage.
   */
  constructor() {
    this.loadUserFromLocalStorage();
  }

  /**
   * Sets the current user.
   * @param user The user to set as the current user.
   */
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.saveUserToLocalStorage(user);
  }

  /**
   * Clears the current user.
   */
  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
    this.removeUserFromLocalStorage();
    this.router.navigate(['login'])
  }

  /**
   * Saves the user to local storage.
   * @param user The user to save to local storage.
   */
  private saveUserToLocalStorage(user: User): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  /**
   * Removes the user from local storage.
   */
  private removeUserFromLocalStorage(): void {
    localStorage.removeItem('currentUser');
  }

  /**
   * Loads the user from local storage.
   */
  private loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  /**
   * Gets the current user.
   * @returns The current user.
   */
  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  /**
   * Checks if a user is logged in.
   * @returns A boolean indicating whether a user is logged in.
   */
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  /**
   * Checks if the current user is an admin.
   * @returns A boolean indicating whether the current user is an admin.
   */
  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }

  /**
   * Gets the ID of the current user.
   * @returns The ID of the current user.
   */
  getUserId(): number | undefined {
    return this.currentUserSubject.value?.id;
  }

  /**
   * Handles user roles on login.
   * @param currentUser The current user.
   */
  handleRolesOnLogin(currentUser: User | null): boolean | void {
    if (currentUser?.role === 'admin') {
      this.router.navigateByUrl('');
    }
    else if (currentUser?.role === 'user') {
      this.router.navigate(['view', currentUser?.id])
    }
    else if (currentUser === null) {
      this.router.navigate(['login']);
      this.snackbar.open('invalid credentials', '', { duration: 2500 })
    }
  }
}
