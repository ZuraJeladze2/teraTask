import { ChangeDetectionStrategy, Component, Input, booleanAttribute } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { BtnComponent } from "../btn/btn.component";

/**
* Icon component
*
* @export
* @class IconComponent
* @typedef {IconComponent}
*/
@Component({
  selector: 'app-icon',
  standalone: true,
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, MatButtonModule, BtnComponent]
})
export class IconComponent {
  /**
  * Icon name
  *
  * @type {string}
  */
  @Input() name: string = '';

  /**
  * Icon color
  *
  * @type {string}
  */
  @Input() color: string = '';

  /**
  * Whether the icon is a FAB (Floating Action Button)
  *
  * @type {boolean}
  */
  @Input({
    transform: booleanAttribute
  }) fab: boolean = false;

  /**
  * Whether the icon is a button
  *
  * @type {boolean}
  */
  @Input({
    transform: booleanAttribute
  }) btn: boolean = false;
}