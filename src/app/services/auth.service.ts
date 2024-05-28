import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { UserService } from './user.service';
import { UserStateFacade } from '../facades/user-state.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userService = inject(UserService);
  private userStateFacade = inject(UserStateFacade);

  constructor() {}

  login(email: string, password: string): Observable<User[] | null> {
    return this.userService.getUserByCode('email', email, 'password', password)
  }

  logout(): void {
    this.userStateFacade.clearCurrentUser();
  }
}
