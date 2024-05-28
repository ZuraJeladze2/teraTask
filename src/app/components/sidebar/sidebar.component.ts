import { Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild, inject } from '@angular/core';
import { FormComponent } from "../form/form.component";
import { BtnComponent } from '../btn/btn.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService } from '../../services/auth.service';
import { MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [FormComponent, BtnComponent, MatSnackBarModule, MatTabsModule, MatButtonToggleModule, MatIcon, MatTooltipModule]
})
export class SidebarComponent implements OnDestroy {
  authService = inject(AuthService)
  snackbar = inject(MatSnackBar)
  router: Router = inject(Router);
  userService = inject(UserService);
  // @ViewChild('group') tableView!: MatButtonToggleGroup;
  @Output() logoutEvent: EventEmitter<any> = new EventEmitter();
  private unSubscriber: Subject<void> = new Subject<void>();

  userForm: FormGroup = new FormGroup({
    id: new FormControl<string>(''), //json serveri agenerirebs
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl<'admin' | 'user'>('user')
  })


  toggleTableView(tableViewOn: boolean) {
    tableViewOn ? this.userService.tableViewOn() : this.userService.tableViewOff();
  }

  submit() {
    this.userForm.markAllAsTouched();
    if (this.userForm.invalid) {
      this.snackbar.open('invalid form!', 'dismiss', { duration: 2000 })
      return;
    };

    const userObj = this.userForm.getRawValue();
    this.userService.createUser(userObj)
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
