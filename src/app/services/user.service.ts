import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl;
  private userStateService = inject(UserStateService)
  private http = inject(HttpClient);
  tableViewSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  tableView$: Observable<boolean> = this.tableViewSubject.asObservable();

  // *table.facade
  // tableViewOn(): void {
  //   this.tableViewSubject.next(true)
  //   localStorage.setItem('tableView', 'true')
  // }
  // tableViewOff(): void {
  //   this.tableViewSubject.next(false)
  //   localStorage.removeItem('tableView')
  // }
  // getTableView(): Observable<boolean> {
  //   this.tableViewSubject.next(!!localStorage.getItem('tableView'))
  //   return this.tableView$;
  // }

  loadUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`)
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
  getUserByCode(field1: string, value1: string, field2: string, value2: string): Observable<User[] | null> {
    return this.http.get(`${this.apiUrl}/users`, {
      params: {
        [field1]: value1, [field2]: value2
      }
    }) as Observable<User[] | null>
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