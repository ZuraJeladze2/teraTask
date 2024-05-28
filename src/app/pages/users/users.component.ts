import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { BtnComponent } from "../../components/btn/btn.component";
import { CardComponent } from "../../components/card/card.component";
import { TableComponent } from "../../components/table/table.component";
import { TableFacade } from '../../facades/table.facade';
import { UserFacade } from '../../facades/user.facade';

@Component({
  selector: 'app-users',
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe, MatButtonModule, RouterLink, MatTableModule, MatIcon,
    MatPaginatorModule, NgIf, CardComponent, BtnComponent,
    TableComponent
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  /**
   * Instance of the UserFacade service.
   */
  userFacade: UserFacade = inject(UserFacade);

  /**
   * Instance of the TableFacade service.
   */
  tableFacade: TableFacade = inject(TableFacade);

  /**
   * Observable that emits users data.
   */
  users$ = this.userFacade.getUsers();

  /**
   * Subscription to the table view state.
   */
  tableViewSub: Subscription | undefined;

  /**
   * Observable that emits the table view state.
   */
  getTableView$ = this.tableFacade.getTableView();

  /**
   * Subscribes to the table view state on component initialization.
   */
  ngOnInit() {
    this.tableViewSub = this.getTableView$.subscribe();
  }

  /**
   * Unsubscribes from the table view state on component destruction.
   */
  ngOnDestroy(): void {
    this.tableViewSub?.unsubscribe();
  }
}
