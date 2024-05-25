import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { MatIcon } from '@angular/material/icon';
import { CardComponent } from "../../components/card/card.component";

@Component({
    selector: 'app-users',
    standalone: true,
    imports: [AsyncPipe, MatCardModule, MatButtonModule, RouterLink, MatTableModule, MatIcon, MatPaginatorModule, NgIf, CardComponent],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  usersServ = inject(UserService)
  users$: Observable<User[]>;
  users: User[] = [];
  tableView: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>(this.users);

  constructor() {
    this.users$ = this.usersServ.getUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteUser(id: string) {
    this.usersServ.deleteUser(id).subscribe(() => {
      this.users$ = this.usersServ.getUsers();
    });
  }
}
