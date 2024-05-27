import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  userService = inject(UserService)


  constructor() {
    this.loadUserFromLocalStorage();
    this.syncLocalStorageWithBehaviorSubject();
  }

  // Simulate login request
  login(email: string, password: string): Observable<User[] | null> {
    return this.userService.getUserByCode('email', email, 'password', password);
  }

  // Logout
  logout(): void {
    this.clearCurrentUser();
  }

  // Check if user is logged in
  // ? ar mhcirdeba, imitoro role-s ver davadgen booleanit. BehaviorSubject minda
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin() {
    return !!this.currentUserSubject.value?.role;
  }


  // Set current user
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.saveUserToLocalStorage(user);
  }

  // Clear current user
  private clearCurrentUser(): void {
    this.currentUserSubject.next(null);
    this.removeUserFromLocalStorage();
  }

  private saveUserToLocalStorage(user: User): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }
  private removeUserFromLocalStorage() {
    localStorage.removeItem('currentUser');
  }
  private loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Sync localStorage with BehaviorSubject. if someone deleted manually from localstorage
  private syncLocalStorageWithBehaviorSubject(): void {
    window.addEventListener('storage', () => {
      const storedUser = localStorage.getItem('currentUser');
      const currentUser = this.currentUserSubject.value;
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (!currentUser || (currentUser && currentUser.id !== parsedUser.id)) {
          this.currentUserSubject.next(parsedUser);
        }
      } else if (currentUser) {
        this.currentUserSubject.next(null);
        
      }
    });
  }
}
