import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe, MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  usersServ = inject(UserService)
  users$: Observable<User[]>;

  constructor(){
    this.users$ = this.usersServ.getUsers();
  }
}
