import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  // Simulate login request
  login(email: string, password: string): Observable<boolean> {
    //! hardcoded authorisation!
    // Assuming login is successful if email and password match.
    const isAuthenticated = email === 'admin@gmail.com' && password === 'admin';
    return of(isAuthenticated).pipe(
      tap(authenticated => {
        if (authenticated) {
          const user: User = {
            name: 'admin',
            id: 'noId',
            email: email,
            role: 'admin'
          };
          this.setCurrentUser(user);
        }
      }),
      catchError(err => {
        console.error('Error during login:', err);
        return of(err);
      })
    );
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
  private setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  // Clear current user
  private clearCurrentUser(): void {
    this.currentUserSubject.next(null);
  }
}
