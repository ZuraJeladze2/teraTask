import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../../interfaces/user.interface";
import { BtnComponent } from "../btn/btn.component";
import { IconComponent } from "../icon/icon.component";

/**
* Card component
*
* A custom card component that displays user information and includes a button and icon.
*
* @export
* @class CardComponent
* @typedef {CardComponent}
* @implements {OnInit}
* @implements {OnDestroy}
*/
@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AsyncPipe, RouterLink, MatCardModule, MatIconModule, MatButtonModule, BtnComponent, IconComponent]
})
export class CardComponent implements OnInit, OnDestroy {
  /**
  * The user object to be displayed in the card
  *
  * A User interface object that contains user information.
  *
  * @type {!User}
  */
  @Input()
  user!: User;

  /**
  * Indicates whether the button should be shown
  *
  * A boolean flag that determines the visibility of the button.
  *
  * @type {boolean}
  * @default false
  */
  btnShow: boolean = false;

  /**
  * The activated route object
  *
  * An instance of ActivatedRoute that provides information about the current route.
  *
  * @type {ActivatedRoute}
  */
  route: ActivatedRoute = inject(ActivatedRoute)

  /**
  * Subscription to the route URL changes
  *
  * A Subscription object that listens to changes in the route URL and updates the button visibility.
  *
  * @type {(Subscription | undefined)}
  */
  btnToggleSub: Subscription | undefined;

  /**
  * Initializes the component
  *
  * Subscribes to the route URL changes and sets the initial button visibility.
  */
  ngOnInit(): void {
    this.btnToggleSub = this.route.url.subscribe(x => {
      if (x.length === 0) return;
      if (x[0].path === 'view') {
        this.btnShow = true;
      } else {
        this.btnShow = false;
      }
    })
  }

  /**
  * Cleanup when the component is destroyed
  *
  * Unsubscribes from the route URL changes to prevent memory leaks.
  */
  ngOnDestroy(): void {
    this.btnToggleSub?.unsubscribe();
  }
}