import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [MatCardModule, MatDivider],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
