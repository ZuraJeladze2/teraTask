import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, filter, map, of, retryWhen, switchMap, tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    MatFormFieldModule, ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatInputModule, AsyncPipe
  ],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {
  router = inject(Router)
  route = inject(ActivatedRoute)
  userService = inject(UserService)

  erroMessage: string = '';

  userForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)])
  })
  user$: Observable<User | any> = this.route.params.pipe(
    switchMap(params => {
      if (Object.keys(params).length === 0) {
        return of(null)
      };
      return this.userService.getUser(params['id']).pipe(
        catchError(err => {
          if (err.status === 404) {
            console.warn('useri ver moidzebna');
          }
          return of(err)
        })
      );
    }),
    tap(data => {
      if (data?.status === 404) {
        this.router.navigateByUrl(''); //xelit chawerili araswori id
      }
      else if (data) {
        this.userForm.patchValue(data)
        console.log('edit user:', data);
      }
      else {
        console.log('create user');
      }
    }),
  )

  registerUser() {
    if (this.userForm.valid) {
      const id = this.userForm.get('id')?.value;
      if (id) {
        console.log('id gvaq!', id);
        this.userService.updateUser(this.userForm.getRawValue()).subscribe(x => {
          return this.router.navigate(['']);
        })
      }
      else {
        console.log('id ar gvaq!', id);
        this.userService.createUser(this.userForm.getRawValue()).subscribe(x => {
          return this.router.navigate(['']);
        })
      }

    }
  }
}
