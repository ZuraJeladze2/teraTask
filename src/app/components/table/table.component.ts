import { Component, Input, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BtnComponent } from '../btn/btn.component';
import { CardComponent } from '../card/card.component';
import { IconComponent } from "../icon/icon.component";
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe, RouterLink,
    MatTableModule, MatPaginatorModule, MatSortModule, MatSort,
    BtnComponent, IconComponent
  ]
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  usersServ = inject(UserService);
  authServ = inject(AuthService)
  isAdmin = this.authServ.isAdmin();
  @Input() users$: Observable<User[]> = new Observable<User[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = this.isAdmin ? ['id', 'name', 'email', 'role', 'actions'] : ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<User>();
  private unSubscriber = new Subject<void>();


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.users$
      .pipe(takeUntil(this.unSubscriber))
      .subscribe(users => {
        this.dataSource.data = users
        this.dataSource.paginator = this.paginator; // Reassign paginator after data update
        this.dataSource.sort = this.sort;
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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