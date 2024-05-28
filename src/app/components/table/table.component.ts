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
  /**
   * Facade service for user-related operations.
   */
  authFacade = inject(UserFacade);

  /**
   * Facade service for managing user state.
   */
  userStateFacade = inject(UserStateFacade)

  /**
   * Indicates whether the current user is an admin.
   */
  isAdmin = this.userStateFacade.isAdmin();

  /**
   * Observable representing the list of users to display in the table.
   */
  @Input() users$!: Observable<User[]>;

  /**
   * Reference to the paginator element.
   */
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  /**
   * Reference to the sort element.
   */
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * List of column names to display in the table.
   */
  displayedColumns: string[] = this.isAdmin ? ['id', 'name', 'email', 'role', 'actions'] : ['id', 'name', 'email'];

  /**
   * Data source for the MatTable.
   */
  dataSource = new MatTableDataSource<User>();

  /**
   * Subject for managing component destruction.
   */
  private unSubscriber = new Subject<void>();

  /**
   * Filter value used for table filtering.
   */
  filterVal: string = '';

  /**
   * Initializes the component.
   */
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.users$
      .pipe(takeUntil(this.unSubscriber))
      .subscribe(users => {
        this.dataSource.data = users
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  /**
   * Performs initialization after view initialization.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Deletes a user with the specified ID.
   * @param id The ID of the user to delete.
   */
  deleteUser(id: string) {
    this.authFacade.deleteUser(id)
      .pipe(takeUntil(this.unSubscriber))
      .subscribe(); // UserService will update the BehaviorSubject
  }

  /**
   * Applies the filter to the table data.
   * @param reset Whether to reset the filter value before applying.
   */
  applyFilter(reset: boolean = false) {
    if(reset) this.filterVal = '';
    this.dataSource.filter = this.filterVal.trim().toLowerCase();
  }

  /**
   * Performs cleanup operations when the component is destroyed.
   */
  ngOnDestroy(): void {
    this.unSubscriber.next();
    this.unSubscriber.complete();
  }
}