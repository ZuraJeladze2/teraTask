import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../interfaces/user.interface';
import { UserStateService } from '../../services/user-state.service';
import { UserService } from '../../services/user.service';
import { BtnComponent } from '../btn/btn.component';
import { IconComponent } from "../icon/icon.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe, RouterLink, FormsModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatSort, MatFormFieldModule, MatInputModule, MatIcon, MatButtonModule,
    BtnComponent, IconComponent
  ]
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  usersServ = inject(UserService);
  userStateServ = inject(UserStateService)
  isAdmin = this.userStateServ.isAdmin();
  @Input() users$: Observable<User[]> = new Observable<User[]>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = this.isAdmin ? ['id', 'name', 'email', 'role', 'actions'] : ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<User>();
  private unSubscriber = new Subject<void>();
  filterVal: string = '';


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

  applyFilter(reset: boolean = false) {
    if(reset) this.filterVal = '';
    this.dataSource.filter = this.filterVal.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}