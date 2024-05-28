import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { BtnComponent } from "../../components/btn/btn.component";
import { FormComponent } from "../../components/form/form.component";
import { AuthService } from '../../services/auth.service';
import { UserStateFacade } from '../../facades/user-state.facade';
/**
 * Component for handling user login.
 */
@Component({
    /**
     * Selector for the component.
     */
    selector: 'app-login',
  
    /**
     * Indicates if the component is standalone.
     */
    standalone: true,
  
    /**
     * Template URL for the component.
     */
    templateUrl: './login.component.html',
  
    /**
     * Style URL for the component.
     */
    styleUrl: './login.component.scss',

    /**
     * Change detection strategy for the component.
     */
    changeDetection: ChangeDetectionStrategy.OnPush,
  
    /**
     * Array of imported Angular modules.
     */
    imports: [FormComponent, BtnComponent, RouterLink]
  })
  export class LoginComponent implements OnDestroy {
    /**
     * Authentication service for user login.
     */
    authService = inject(AuthService);
  
    /**
     * User state facade for managing user state.
     */
    userStateFacade = inject(UserStateFacade);
  
    /**
     * Angular router service for navigation.
     */
    router = inject(Router);
  
    /**
     * Material snack bar service for displaying notifications.
     */
    snackbar = inject(MatSnackBar);
  
    /**
     * Subscription for the login process.
     */
    loginSubscription: Subscription | undefined;
  
    /**
     * Form group for user login data.
     */
    userForm: FormGroup = new FormGroup({
      id: new FormControl<string>(''),
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    });
  
    /**
     * Handles the login process.
     */
    login() {
      // Mark all form controls as touched
      this.userForm.markAllAsTouched();
  
      // Check if the form is valid
      if (this.userForm.valid) {
        // Get email and password from form
        const email = this.userForm.get('email')?.value;
        const password = this.userForm.get('password')?.value;
  
        // Subscribe to the login process
        this.loginSubscription = this.authService.login(email, password)
          .pipe(
            // Map the response to extract the user
            map(users => users ? users[0] : null),
            // Switch to current user observable
            switchMap(user => {
              if (user) this.userStateFacade.setCurrentUser(user);
              return this.userStateFacade.currentUser$;
            })
          )
          .subscribe(currentUser => {
            // Handle user roles on login
            this.userStateFacade.handleRolesOnLogin(currentUser);
          });
      } else {
        // Display snackbar for invalid login form
        this.snackbar.open('invalid login form!', 'dismiss', { duration: 2500 });
      }
    }
  
    /**
     * Cleans up resources when the component is destroyed.
     */
    ngOnDestroy() {
      this.loginSubscription?.unsubscribe();
    }
  }
  