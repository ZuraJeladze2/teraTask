import { Component, OnDestroy, inject } from '@angular/core';
import { FormComponent } from "../../components/form/form.component";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BtnComponent } from "../../components/btn/btn.component";
import { AuthService } from '../../services/auth.service';
import { Subject, of, switchMap, takeUntil } from 'rxjs';

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormComponent, BtnComponent]
})
export class LoginComponent implements OnDestroy {
    authService = inject(AuthService)
    errorMessage: string = '';
    router = inject(Router)
    private unSubscriber: Subject<void> = new Subject<void>();

    userForm: FormGroup = new FormGroup({
        id: new FormControl<string>(''),
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    })



    login() {
        if (this.userForm.valid) {
            const email = this.userForm.get('email')?.value
            const password = this.userForm.get('password')?.value
            this.authService.login(email, password)
                .pipe(
                    takeUntil(this.unSubscriber),
                    switchMap(x => {
                        console.log(x)
                        return this.authService.currentUser$
                    })
                )
                .subscribe(x => {
                    console.log('authenticated', x);
                    if (x?.role === 'admin') {
                        this.router.navigateByUrl('');
                    }
                    else if(x?.role === 'user'){
                        this.router.navigate(['view', x?.id])
                    }
                })
        }
        else {
            this.errorMessage = 'invalid login form!'
            console.warn(this.errorMessage);

        }
    }

    ngOnDestroy() {
        this.unSubscriber.next();
        this.unSubscriber.complete();
    }

}
