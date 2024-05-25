import { Component, inject } from '@angular/core';
import { FormComponent } from "../../components/form/form.component";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BtnComponent } from "../../components/btn/btn.component";

@Component({
    selector: 'app-login',
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    imports: [FormComponent, BtnComponent]
})
export class LoginComponent {
login() {
throw new Error('Method not implemented.');
}
    errorMessage: string = '';
    router = inject(Router)

    userForm: FormGroup = new FormGroup({
        id: new FormControl<string>(''),
        email: new FormControl<string>('', [Validators.required, Validators.email]),
        password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    })
}
