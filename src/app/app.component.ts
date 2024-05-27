import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { BtnComponent } from "./components/btn/btn.component";
import { IconComponent } from "./components/icon/icon.component";
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    MatSidenavModule, MatInputModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDrawer,
    BtnComponent, IconComponent
  ]
})
export class AppComponent {
  title = 'UserManagement';
  authService = inject(AuthService)
  currentUser$ = this.authService.currentUser$;

  ngOnInit() {
    this.currentUser$.subscribe(x => {
      console.log('current user is ', x);

    })
  }
}
