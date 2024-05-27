import { Component, Input, booleanAttribute } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BtnComponent } from "../btn/btn.component";

@Component({
    selector: 'app-icon',
    standalone: true,
    templateUrl: './icon.component.html',
    styleUrl: './icon.component.scss',
    imports: [MatIconModule, MatButtonModule, BtnComponent]
})
export class IconComponent {
  @Input() name: string = '';
  @Input() color: string = '';
  @Input({
    transform: booleanAttribute
  }) fab: boolean = false
  @Input({
    transform: booleanAttribute
  }) btn: boolean = false

}
