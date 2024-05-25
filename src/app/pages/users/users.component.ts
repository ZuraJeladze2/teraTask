import { AsyncPipe, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Observable, Subject, Subscription, of, takeUntil } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { MatIcon } from '@angular/material/icon';
import { CardComponent } from "../../components/card/card.component";
import { BtnComponent } from "../../components/btn/btn.component";

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe, MatButtonModule, RouterLink, MatTableModule, MatIcon,
    MatPaginatorModule, NgIf, CardComponent, BtnComponent
  ]
})
export class UsersComponent implements AfterViewInit, OnDestroy {
  users$: Observable<User[]> = of([]);
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'actions'];
  dataSource = new MatTableDataSource<User>();
  tableView: boolean = true;
  private unSubscriber = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private usersServ: UserService) { }

  ngOnInit() {
    this.users$ = this.usersServ.getUsers();
    this.users$
      .pipe(takeUntil(this.unSubscriber))
      .subscribe(users => {
        this.dataSource.data = users;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteUser(id: string) {
    this.usersServ.deleteUser(id)
      .pipe(takeUntil(this.unSubscriber))
      .subscribe(); // UserService will update the BehaviorSubject
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }

}
