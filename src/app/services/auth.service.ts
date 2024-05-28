import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { UserStateFacade } from '../facades/user-state.facade';
import { User } from '../interfaces/user.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userService = inject(UserService);
  private userStateFacade = inject(UserStateFacade);
  private http = inject(HttpClient)

  constructor() { }

  login(email: string, password: string): Observable<User[] | null> {
    return this.userService.getUserByCode('email', email.toLowerCase(), 'password', password);
  }

  logout(): void {
    this.userStateFacade.clearCurrentUser();
  }

  createUser(user: Partial<User>): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.apiUrl}/users`, user, { headers });
  }

  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user, { headers });
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`);
  }
}