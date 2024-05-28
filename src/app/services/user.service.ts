import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  /**
   * Retrieves all users.
   * @returns An observable of the user data array.
   */
  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  /**
   * Retrieves a user by ID.
   * @param id The ID of the user to retrieve.
   * @returns An observable of the user data.
   */
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  /**
   * Retrieves a user by custom fields.
   * @param field1 The first field name.
   * @param value1 The value of the first field.
   * @param field2 The second field name.
   * @param value2 The value of the second field.
   * @returns An observable of the user data array matching the criteria.
   */
  getUserByCode(field1: string, value1: string, field2: string, value2: string): Observable<User[] | null> {
    return this.http.get(`${this.apiUrl}/users`, {
      params: {
        [field1]: value1,
        [field2]: value2
      }
    }) as Observable<User[] | null>;
  }
}
