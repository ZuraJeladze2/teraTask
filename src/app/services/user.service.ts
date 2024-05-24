import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
/**
* User service class that provides methods for interacting with the user API.
*/
@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
  * API URL for user endpoints
  */
  apiUrl = environment.apiUrl;

  /**
  * Injected HTTP client instance
  */
  http = inject(HttpClient);

  /**
  * Retrieves a list of all users
  *
  * @returns {Observable<User[]>} An observable that emits an array of User objects
  */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  /**
  * Retrieves a single user by ID
  *
  * @param {string} id The ID of the user to retrieve
  * @returns {Observable<User>} An observable that emits a single User object
  */
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  /**
  * Creates a new user
  *
  * @param {Partial<User>} user The partial user data to create
  * @returns {Observable<User>} An observable that emits the created User object
  */
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  /**
  * Updates an existing user
  *
  * @param {User} user The user data to update
  * @returns {Observable<User>} An observable that emits the updated User object
  */
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user);
  }

  /**
  * Deletes a user by ID
  *
  * @param {string} id The ID of the user to delete
  * @returns {Observable<User>} An observable that emits the deleted User object
  */
  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`);
  }
}