import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, Output, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TableFacade } from '../../facades/table.facade';
import { UserStateFacade } from '../../facades/user-state.facade';
import { UserFacade } from '../../facades/user.facade';
import { Role, User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { BtnComponent } from '../btn/btn.component';
import { FormComponent } from "../form/form.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormComponent, BtnComponent, MatSnackBarModule, MatTabsModule, MatButtonToggleModule, MatIcon, MatTooltipModule, AsyncPipe]
})
export class SidebarComponent implements OnDestroy {
  /**
   * Facade service for user-related operations.
   */
  userFacade = inject(UserFacade);

  /**
   * Service for user authentication.
   */
  authService = inject(AuthService);

  /**
   * SnackBar for displaying notifications.
   */
  snackbar = inject(MatSnackBar);

  /**
   * Router service for navigation.
   */
  router: Router = inject(Router);

  /**
   * Service for user-related operations.
   */
  userService = inject(UserService);

  /**
   * Facade service for managing table view state.
   */
  tableFacade: TableFacade = inject(TableFacade);

  /**
   * Facade service for managing user state.
   */
  userStateFacade: UserStateFacade = inject(UserStateFacade);

  /**
   * Observable representing the current user.
   */
  currentUser$: Observable<User | null> = this.userStateFacade.currentUser$;

  /**
   * Event emitter for logout event.
   */
  @Output() logoutEvent: EventEmitter<null> = new EventEmitter();

  /**
   * Subject for managing component destruction.
   */
  private unSubscriber: Subject<void> = new Subject<void>();

  /**
   * Form group for user input.
   */
  userForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl<Role>('user')
  })

  /**
   * Toggles the table view on or off based on the provided boolean value.
   * @param tableViewOn Whether the table view should be turned on or off.
   */
  toggleTableView(tableViewOn: boolean) {
    tableViewOn ? this.tableFacade.tableViewOn() : this.tableFacade.tableViewOff();
  }

  /**
   * Submits the user form data for user creation.
   */
  submit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      this.snackbar.open('invalid form!', 'dismiss', { duration: 2000 })
      return;
    };

    const userObj = this.userForm.getRawValue();
    this.userFacade.createUser(userObj)
      .pipe(takeUntil(this.unSubscriber))
      .subscribe(() => {
        this.snackbar.open('User added', '', { duration: 1000 })
        this.userForm.reset();
      });
  }

  /**
   * Logs out the current user.
   */
  logout() {
    this.logoutEvent.emit()
    this.authService.logout();
  }

  /**
   * Performs cleanup operations when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}
