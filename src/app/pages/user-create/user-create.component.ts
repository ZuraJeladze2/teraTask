import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, Subject, catchError, of, switchMap, takeUntil, tap } from 'rxjs';
import { BtnComponent } from "../../components/btn/btn.component";
import { FormComponent } from "../../components/form/form.component";
import { UserStateFacade } from '../../facades/user-state.facade';
import { UserFacade } from '../../facades/user.facade';
import { Role, User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';


/**
 * Component for creating a new user.
 */
@Component({
  /**
   * Selector for the component.
   */
  selector: 'app-user-create',

  /**
   * Indicates if the component is standalone.
   */
  standalone: true,

  /**
   * Template URL for the component.
   */
  templateUrl: './user-create.component.html',

  /**
   * Style URL for the component.
   */
  styleUrl: './user-create.component.scss',

  /**
   * Change detection strategy for the component.
   */
  changeDetection: ChangeDetectionStrategy.OnPush,

  /**
   * Array of imported Angular modules.
   */
  imports: [
    JsonPipe,
    ReactiveFormsModule,
    AsyncPipe,
    FormComponent,
    BtnComponent,
    RouterLink,
  ]
})
export class UserCreateComponent implements OnDestroy {
  /**
   * Subject for managing component destruction.
   */
  private unSubscriber: Subject<void> = new Subject<void>();

  /**
   * Angular router service for navigation.
   */
  router = inject(Router);

  /**
   * Angular activated route service for route parameters.
   */
  route = inject(ActivatedRoute);

  /**
   * User service for user-related operations.
   */
  userService = inject(UserService);

  /**
   * User facade for user-related state management.
   */
  userFacade = inject(UserFacade);

  /**
   * User state facade for managing user state.
   */
  userStateFacade = inject(UserStateFacade);

  /**
   * Material snack bar service for displaying notifications.
   */
  snackbar = inject(MatSnackBar);


  /**
   * Form group for user data.
   */
  userForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''), //json serveri agenerirebs
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl<Role>('user')
  });

  /**
   * Observable for fetching user data based on route parameters.
   */
  user$: Observable<User | null> = this.route.params.pipe(
    switchMap(params =>
      Object.keys(params).length === 0
        ? of(null)
        : this.userService.getUser(params['id']).pipe(
          tap(user => {
            this.userForm.patchValue(user);
          })
        )
    ),
    switchMap(() => {
      return this.userStateFacade.currentUser$;
    }),
    catchError(err => {
      if (err.status === 404) {
        this.snackbar.open('404 not found', 'dismiss', { duration: 2000 });
        this.router.navigateByUrl('');
      }
      return of(null);
    })
  );

  /**
   * Handles form submission for creating or editing a user.
   */
  submit() {
    // Mark all form controls as touched
    this.userForm.markAllAsTouched();

    // Check if the form is invalid
    if (this.userForm.invalid) {
      this.snackbar.open('invalid form!', 'dismiss', { duration: 2000 });
      return;
    }

    // Get raw user data from form
    const userObj = this.userForm.getRawValue();
    const id = this.userForm.get('id')?.value;

    // Check if it's an update or creation
    if (id) {
      this.snackbar.open('User edited', '', { duration: 1000 });
      this.userFacade.updateUser(userObj)
        .pipe(takeUntil(this.unSubscriber))
        .subscribe(() => {
          this.userForm.reset();
          this.router.navigate(['/users']);
        });
    } else {
      this.snackbar.open('User created', '', { duration: 1000 });
      this.userFacade.createUser(userObj)
        .pipe(takeUntil(this.unSubscriber))
        .subscribe((user) => {
          this.userForm.reset();
          this.userStateFacade.setCurrentUser(user);
          this.router.navigate(['/users']);
        });
    }
  }

  /**
   * Cleans up resources when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}
