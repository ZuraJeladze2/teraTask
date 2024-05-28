import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UserStateFacade } from './user-state.facade';
/**
 * Facade service for managing user-related operations.
 * @remarks This service provides methods for loading users, creating, updating, and deleting users.
 */
@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  /**
   * BehaviorSubject holding the list of users.
   */
  private usersSubject = new BehaviorSubject<User[]>([]);

  /**
   * Observable representing the list of users.
   */
  users$: Observable<User[]> = this.usersSubject.asObservable();

  /**
   * UserService instance for user-related operations.
   */
  private userService = inject(UserService);

  /**
   * AuthService instance for authentication-related operations.
   */
  private authService = inject(AuthService);

  /**
   * UserStateFacade instance for managing user state.
   */
  private userStateFacade = inject(UserStateFacade);

  /**
   * Initializes the UserFacade service and loads users.
   */
  constructor() {
    this.loadUsers();
  }

  /**
   * Loads users from the UserService and updates the usersSubject.
   */
  loadUsers() {
    this.userService.getUsers().pipe(
      shareReplay(1)
    ).subscribe(users => this.usersSubject.next(users));
  }

  /**
   * Gets the list of users.
   * @returns An observable emitting the list of users.
   */
  getUsers(): Observable<User[]> {
    return this.users$;
  }

  /**
   * Gets a user by ID.
   * @param id The ID of the user to retrieve.
   * @returns An observable emitting the user with the specified ID.
   */
  getUser(id: string): Observable<User> {
    return this.userService.getUser(id);
  }

  /**
   * Gets users by custom fields.
   * @param field1 The name of the first field to filter by.
   * @param value1 The value of the first field to filter by.
   * @param field2 The name of the second field to filter by.
   * @param value2 The value of the second field to filter by.
   * @returns An observable emitting the users matching the specified criteria.
   */
  getUserByCode(field1: string, value1: string, field2: string, value2: string): Observable<User[] | null> {
    return this.userService.getUserByCode(field1, value1, field2, value2);
  }

  /**
   * Creates a new user using the AuthService and updates the list of users.
   * @param user The user to create.
   * @returns An observable indicating the success or failure of the operation.
   */
  createUser(user: Partial<User>) {
    return this.authService.createUser(user).pipe(
      tap(() => this.loadUsers())
    )
  }

  /**
   * Updates an existing user using the AuthService and updates the list of users.
   * @param user The updated user object.
   * @returns An observable indicating the success or failure of the operation.
   */
  updateUser(user: User) {
    return this.authService.updateUser(user).pipe(
      tap((updatedUser) => {
        this.loadUsers();
        const currentUser = this.userStateFacade.getCurrentUser();
        if (currentUser && currentUser.id === updatedUser.id) {
          this.userStateFacade.setCurrentUser(updatedUser);
        }
      })
    )
  }

  /**
   * Deletes a user using the AuthService and updates the list of users.
   * @param id The ID of the user to delete.
   * @returns An observable indicating the success or failure of the operation.
   */
  deleteUser(id: string) {
    return this.authService.deleteUser(id).pipe(
      tap(() => this.loadUsers())
    )
  }
}
