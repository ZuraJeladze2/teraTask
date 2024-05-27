import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromLocalStorage();
  }

  getCurrentUser(){
    return this.currentUserSubject.value
  }
  
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.saveUserToLocalStorage(user);
  }

  clearCurrentUser(): void {
    this.currentUserSubject.next(null);
    this.removeUserFromLocalStorage();
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

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'admin';
  }
}