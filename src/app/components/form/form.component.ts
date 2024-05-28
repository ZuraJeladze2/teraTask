import { Component, Input } from '@angular/core';
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
  styleUrl: './form.component.scss'
})
export class FormComponent {
  @Input() form!: FormGroup;
  @Input() state!: 'login' | 'register' | 'edit';
  @Input() currentUserRole: Role = 'user'
}
