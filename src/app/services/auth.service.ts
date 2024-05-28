import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserStateService } from './user-state.service';
import { UserService } from './user.service';

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
}
