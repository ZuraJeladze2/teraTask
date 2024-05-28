import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserStateFacade {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  router = inject(Router)
  snackbar = inject(MatSnackBar)

  constructor() {
    this.loadUserFromLocalStorage();
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.saveUserToLocalStorage(user);
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
    this.removeUserFromLocalStorage();
    this.router.navigate(['login'])
  }

  private saveUserToLocalStorage(user: User): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  private removeUserFromLocalStorage(): void {
    localStorage.removeItem('currentUser');
  }

  private loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }
  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }
  getUserId(): number | undefined {
    return this.currentUserSubject.value?.id;
  }


  handleRolesOnLogin(currentUser: User | null): boolean | void {
    if (currentUser?.role === 'admin') {
      this.router.navigateByUrl('');
    }
    else if (currentUser?.role === 'user') {
      this.router.navigate(['view', currentUser?.id])
    }
    else if (currentUser === null) {
      this.router.navigate(['login']); // tu localstoragedan xelit washli currentUsers
      this.snackbar.open('invalid credentials', '', { duration: 2500 })
    }
  }
}