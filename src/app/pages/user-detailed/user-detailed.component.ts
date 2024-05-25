import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from "../../components/card/card.component";

@Component({
    selector: 'app-user-detailed',
    standalone: true,
    templateUrl: './user-detailed.component.html',
    styleUrl: './user-detailed.component.scss',
    imports: [AsyncPipe, NgIf, MatCardModule, MatButtonModule, RouterLink, CardComponent]
})
export class UserDetailedComponent {
  userService = inject(UserService)
  route = inject(ActivatedRoute)
  user$: Observable<User>;

  constructor() {
    this.user$ = this.route.params.pipe(
      switchMap(params => {
        return this.userService.getUser(params['id'])
      })
    )
  }
}
