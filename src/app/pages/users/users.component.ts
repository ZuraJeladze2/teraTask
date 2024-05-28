import { AsyncPipe, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Observable, Subject, Subscription, of, takeUntil } from 'rxjs';
import { BtnComponent } from "../../components/btn/btn.component";
import { CardComponent } from "../../components/card/card.component";
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { TableComponent } from "../../components/table/table.component";
import { UserFacade } from '../../facades/user.facade';
import { TableFacade } from '../../facades/table.facade';

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
export class UsersComponent {
  userFacade: UserFacade = inject(UserFacade)
  tableFacade: TableFacade = inject(TableFacade)
  users$ = this.userFacade.getUsers();
  tableViewSub: Subscription | undefined;
  getTableView = this.tableFacade.getTableView()

  ngOnInit(){
    this.getTableView.subscribe(x => {
      console.log(x);
      
    })
  }
}
