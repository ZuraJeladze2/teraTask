import { Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { Subscription, map, switchMap } from 'rxjs';
import { BtnComponent } from "../../components/btn/btn.component";
import { FormComponent } from "../../components/form/form.component";
import { AuthService } from '../../services/auth.service';
import { UserStateService } from '../../services/user-state.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormComponent, BtnComponent, RouterLink]
})
export class LoginComponent implements OnDestroy {
    authService = inject(AuthService)
    userStateService = inject(UserStateService)
    router = inject(Router)
    snackbar = inject(MatSnackBar)
    loginSubscription: Subscription | undefined;

    userForm: FormGroup = new FormGroup({
        id: new FormControl<string>(''),
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    })



    login() {
        this.userForm.markAllAsTouched();
        if (this.userForm.valid) {
            const email = this.userForm.get('email')?.value
            const password = this.userForm.get('password')?.value
            this.loginSubscription = this.authService.login(email, password)
                .pipe(
                    // takeUntil(this.unSubscriber),
                    map(users => users ? users[0] : null),
                    switchMap(user => {
                        console.warn(user)
                        if (user) this.userStateService.setCurrentUser(user)
                        console.log(this.userStateService.currentUser$);
                        return this.userStateService.currentUser$
                    })
                )
                .subscribe(currentUser => {
                    //! swori facadia
                    this.userStateFacade.handleRolesOnLogin(currentUser)
                })
        }
        else {
            this.snackbar.open('invalid login form!', 'dismiss', { duration: 2500 })
        }
    }

    ngOnDestroy() {
        this.loginSubscription?.unsubscribe()
    }

}
