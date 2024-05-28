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
  private http = inject(HttpClient);

  constructor() { }

  /**
   * Logs in the user with the provided email and password.
   * @param email The user's email address.
   * @param password The user's password.
   * @returns An observable of user data if successful, or null otherwise.
   */
  login(email: string, password: string): Observable<User[] | null> {
    return this.userService.getUserByCode('email', email.toLowerCase(), 'password', password);
  }

  /**
   * Logs out the current user.
   */
  logout(): void {
    this.userStateFacade.clearCurrentUser();
  }

  /**
   * Creates a new user.
   * @param user The user data to be created.
   * @returns An observable of the created user data.
   */
  createUser(user: Partial<User>) {
    user.email = user.email?.toLowerCase();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(`${this.apiUrl}/users`, user, { headers });
  }

  /**
   * Updates an existing user.
   * @param user The user data to be updated.
   * @returns An observable of the updated user data.
   */
  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user, { headers });
  }

  /**
   * Deletes a user by ID.
   * @param id The ID of the user to delete.
   * @returns An observable of the deleted user data.
   */
  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`);
  }
}

