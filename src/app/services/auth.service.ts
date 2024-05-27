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
  // isLoggedIn(): Observable<boolean> {
  //   return this.currentUser$.pipe(
  //     map(user => !!user)
  //   );
  // }

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


  isAdmin() {
    return !!this.currentUserSubject.value?.role;
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
}
