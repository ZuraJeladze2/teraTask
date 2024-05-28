import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

/**
 * Component representing a button.
 */
@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BtnComponent {
   /**
   * Input property to specify the color of the button.
   */
  @Input() color: string = '';
}
