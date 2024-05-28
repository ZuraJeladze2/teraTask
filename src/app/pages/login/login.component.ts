import { Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription, map, switchMap, takeUntil } from 'rxjs';
import { BtnComponent } from "../../components/btn/btn.component";
import { FormComponent } from "../../components/form/form.component";
import { AuthService } from '../../services/auth.service';
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
    vax: Subscription | undefined;
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
            this.vax = this.authService.login(email, password)
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
                    if (currentUser?.role === 'admin') {
                        this.router.navigateByUrl('');
                    }
                    else if (currentUser?.role === 'user') {
                        this.router.navigate(['view', currentUser?.id])
                    }
                    else if(currentUser === null){
                        this.snackbar.open('invalid credentials', '', { duration: 2500 })
                        this.router.navigate(['login']); // tu localstoragedan washli currentUsers
                    }
                })
        }
        else {
            this.alertMessage = 'invalid login form!'
            console.warn(this.alertMessage);
            this.snackbar.open(this.alertMessage, 'dismiss', { duration: 2500 })
        }
    }

    ngOnDestroy() {
        this.vax?.unsubscribe()
        // this.unSubscriber.next();
        // this.unSubscriber.complete();
    }

}
