import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { BtnComponent } from "../btn/btn.component";
import { IconComponent } from "../icon/icon.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterLink, MatCardModule, MatIconModule, MatButtonModule, BtnComponent, IconComponent]
})
export class CardComponent implements OnInit, OnDestroy {
  @Input()
  user!: User;
  btnShow: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  btnToggleSub: Subscription | undefined;


  ngOnInit(): void {

    this.btnToggleSub = this.route.url.subscribe(x => {
      if (x.length === 0) return;
      if (x[0].path === 'view') {
        this.btnShow = true;
      }
      else {
        this.btnShow = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.btnToggleSub?.unsubscribe();
  }
}
