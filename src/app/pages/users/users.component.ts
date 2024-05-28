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
  userFacade: UserFacade = inject(UserFacade)
  tableFacade: TableFacade = inject(TableFacade)
  users$ = this.userFacade.getUsers();
  tableViewSub: Subscription | undefined;
  getTableView$ = this.tableFacade.getTableView()


  ngOnInit(){
    this.tableViewSub = this.getTableView$.subscribe(x => {
      console.log(x);
    })
  }


  ngOnDestroy(): void {
      this.tableViewSub?.unsubscribe();
  }
}
