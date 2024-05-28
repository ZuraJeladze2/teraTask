import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { UserStateService } from '../services/user-state.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserFacadeService {
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();
  private userService = inject(UserService);
  private userStateService = inject(UserStateService);

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.loadUsers().subscribe(users => this.usersSubject.next(users));
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  getUser(id: string): Observable<User> {
    return this.userService.getUser(id); 
  }
  getUserByCode(field1: string, value1: string, field2: string, value2: string): Observable<User[] | null> {
    return this.userService.getUserByCode(field1, value1, field2, value2);
  }
  
  createUser(user: Partial<User>) {
    return this.userService.createUser(user).pipe(
      tap(() => this.loadUsers())
    )
  }
  
  updateUser(user: User) {
    return this.userService.updateUser(user).pipe(
      tap((updatedUser) => {
        this.loadUsers();
        const currentUser = this.userStateService.getCurrentUser();
        if (currentUser && currentUser.id === updatedUser.id) {
          this.userStateService.setCurrentUser(updatedUser);
        }
      })
    )
  }
  
  deleteUser(id: string) {
    return this.userService.deleteUser(id).pipe(
      tap(() => this.loadUsers())
    )
  }
}