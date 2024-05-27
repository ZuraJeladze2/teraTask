import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserService } from './user.service';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userService = inject(UserService);
  private userStateService = inject(UserStateService);

  constructor() {}

  login(email: string, password: string): Observable<User[] | null> {
    return this.userService.getUserByCode('email', email, 'password', password)
  }

  logout(): void {
    this.userStateService.clearCurrentUser();
  }

  isLoggedIn(): boolean {
    return this.userStateService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.userStateService.isAdmin();
  }
}
