import { Component, OnDestroy, inject } from '@angular/core';
import { FormComponent } from "../../components/form/form.component";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BtnComponent } from "../../components/btn/btn.component";
import { AuthService } from '../../services/auth.service';
import { Subject, map, of, switchMap, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStateService } from '../../services/user-state.service';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormComponent, BtnComponent]
})
export class LoginComponent implements OnDestroy {
    authService = inject(AuthService)
    userStateService = inject(UserStateService)
    alertMessage: string = '';
    router = inject(Router)
    snackbar = inject(MatSnackBar)
    private unSubscriber: Subject<void> = new Subject<void>();

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
            this.authService.login(email, password)
                .pipe(
                    takeUntil(this.unSubscriber),
                    map(users => users ? users[0] : null),
                    switchMap(x => {
                        console.warn(x)
                        if (x) this.userStateService.setCurrentUser(x)
                        console.log(this.userStateService.currentUser$);

                        return this.userStateService.currentUser$
                    }),
                    map(users => {
                        return users
                    })
                )
                .subscribe(x => {
                    if (x?.role === 'admin') {
                        this.router.navigateByUrl('');
                    }
                    else if (x?.role === 'user') {
                        this.router.navigate(['view', x?.id])
                    }
                    else {
                        this.snackbar.open('invalid credentials', 'Okay', { duration: 2500 })
                        this.router.navigate(['login']); // tu localstoragedan washli currentUsers
                    }
                })
        }
        else {
            this.alertMessage = 'invalid login form!'
            console.warn(this.alertMessage);
            this.snackbar.open(this.alertMessage, 'dismiss',)
        }
    }

    ngOnDestroy() {
        this.unSubscriber.next();
        this.unSubscriber.complete();
    }

}
