import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, Subject, catchError, of, switchMap, takeUntil, tap } from 'rxjs';
import { BtnComponent } from "../../components/btn/btn.component";
import { FormComponent } from "../../components/form/form.component";
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    FormComponent,
    BtnComponent,
    RouterLink
  ]
})
export class UserCreateComponent implements OnDestroy {
  private unSubscriber: Subject<void> = new Subject<void>();
  router = inject(Router)
  route = inject(ActivatedRoute)
  userService = inject(UserService)
  errorMessage: string = '';

  userForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl<'admin' | 'user'>('user')
  })

  user$: Observable<User | null> = this.route.params.pipe(
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

  registerUser() {
    if (this.userForm.invalid) {
      this.errorMessage = 'invalid form!'
      console.log(this.errorMessage, this.userForm.value);
      return;
    };

    const userObj = this.userForm.getRawValue();
    const id = this.userForm.get('id')?.value;
    if (id) {
      console.log('id gvaq!', id);
      this.userService.updateUser(userObj)
        .pipe(takeUntil(this.unSubscriber))
        .subscribe(() => this.router.navigate(['']));
    }
    else {
      console.log('id ar gvaq!', id);
      this.userService.createUser(userObj)
        .pipe(takeUntil(this.unSubscriber))
        .subscribe(() => this.router.navigate(['']));
    }
  }


  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}
