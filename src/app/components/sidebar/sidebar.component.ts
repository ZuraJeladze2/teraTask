import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
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
import { Role, User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { BtnComponent } from '../btn/btn.component';
import { FormComponent } from "../form/form.component";
import { UserFacade } from '../../facades/user.facade';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [FormComponent, BtnComponent, MatSnackBarModule, MatTabsModule, MatButtonToggleModule, MatIcon, MatTooltipModule, AsyncPipe]
})
export class SidebarComponent implements OnDestroy {
  userFacade = inject(UserFacade)
  authService = inject(AuthService)
  snackbar = inject(MatSnackBar)
  router: Router = inject(Router);
  userService = inject(UserService);
  tableFacade: TableFacade = inject(TableFacade)
  userStateFacade: UserStateFacade = inject(UserStateFacade)
  currentUser$: Observable<User | null> = this.userStateFacade.currentUser$;
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();
  private unSubscriber: Subject<void> = new Subject<void>();

  userForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''), //json serveri agenerirebs
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl<Role>('user')
  })

  toggleTableView(tableViewOn: boolean) {
    tableViewOn ? this.tableFacade.tableViewOn() : this.tableFacade.tableViewOff();
  }

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

  logout() {
    this.logoutEvent.emit(null)
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}
