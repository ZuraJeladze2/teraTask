import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private headers = new HttpHeaders({ //? yvelas xoar chavusva?
    'Content-Type': 'application/json'
  });

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<User[]>(`${this.apiUrl}/users`).subscribe(users => this.usersSubject.next(users));
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  getUserByCode(field: string, value: string): Observable<User[] | null> {
    return this.http.get(`${this.apiUrl}/users`, {
      params: {
        [field]: value
      }
    }) as Observable<User[] | null>
  }


  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user, {
      headers: this.headers               //? json-serveris dokumentaciis mixedvit, tore isec mushaobs.
    }).pipe(
      tap(() => this.loadUsers())
    );
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${user.id}`, user, {
      headers: this.headers               //? json-serveris dokumentaciis mixedvit, tore isec mushaobs.
    }).pipe(
      tap(() => this.loadUsers())
    );
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/users/${id}`).pipe(
      tap(() => this.loadUsers())
    );
  }
}
