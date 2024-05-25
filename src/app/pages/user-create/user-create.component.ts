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

  errorMessage: string = '';

  userForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)])
  })
  user$: Observable<User | any> = this.route.params.pipe(
    switchMap(params =>
      Object.keys(params).length === 0
        ? of(null)
        : this.userService.getUser(params['id']).pipe(
          tap(user => {
            // Logic for successfully fetched user
            this.userForm.patchValue(user);
            console.log('edit user:', user);
          }),
          catchError(err => {
            if (err.status === 404) {
              console.warn('useri ver moidzebna');
              this.router.navigateByUrl(''); // Navigate to another page for invalid ID
            }
            return of(null); // Continue the stream with null
          })
        )
    )
  );

  // ? dzveli, wasashleli, avitanet pipehsi, catcherroris zemot
  // tap(user => {
  //   if (user) {
  //     this.userForm.patchValue(user);
  //     console.log('edit user:', user);
  //   } else {
  //     console.log('create user');
  //   }
  // })


  registerUser() {
    if (this.userForm.invalid) {
      this.errorMessage = 'invalid form!'
      console.log(this.errorMessage);
      return;
    };

    const userObj = this.userForm.getRawValue();
    const id = this.userForm.get('id')?.value;
    if (id) {
      console.log('id gvaq!', id);
      this.userService.updateUser(userObj).subscribe(() => this.router.navigate(['']));
    }
    else {
      console.log('id ar gvaq!', id);
      this.userService.createUser(userObj).subscribe(() => this.router.navigate(['']));
    }
  }
}
