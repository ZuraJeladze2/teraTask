import { AsyncPipe } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserStateFacade } from '../../facades/user-state.facade';
import { UserFacade } from '../../facades/user.facade';
import { User } from '../../interfaces/user.interface';
import { BtnComponent } from '../btn/btn.component';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe, RouterLink, FormsModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatSort, MatFormFieldModule, MatInputModule, MatIcon, MatButtonModule,MatTooltipModule,
    BtnComponent, IconComponent
  ]
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy {
  authFacade = inject(UserFacade);
  userStateFacade = inject(UserStateFacade)
  isAdmin = this.userStateFacade.isAdmin();
  @Input() users$!: Observable<User[]>;
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
    this.authFacade.deleteUser(id)
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