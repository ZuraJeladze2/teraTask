import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Role } from '../../interfaces/user.interface'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatSelectModule, MatError],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Form component
 */
export class FormComponent {
  /**
   * Form group input
   * @type {FormGroup}
   */
  @Input() form!: FormGroup;

  /**
   * State of the form
   * @type {'login' | 'register' | 'edit'}
   */
  @Input() state!: 'login' | 'register' | 'edit';

  /**
   * Current user role
   * @type {Role}
   * @default 'user'
   */
  @Input() currentUserRole: Role = 'user';
}
