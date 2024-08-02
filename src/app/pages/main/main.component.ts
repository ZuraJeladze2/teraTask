import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { TableComponent } from "../../components/table/table.component";
import { UserFacade } from '../../facades/user.facade';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbar, MatCardModule, MatDividerModule, TableComponent,
    MatButtonModule, MatIcon
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  users$ = inject(UserFacade).getUsers();
}
