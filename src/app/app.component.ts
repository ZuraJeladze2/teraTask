import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BtnComponent } from "./components/btn/btn.component";
import { IconComponent } from "./components/icon/icon.component";
import { AuthService } from './services/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserStateFacade } from './facades/user-state.facade';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet, AsyncPipe, NgIf, RouterLink,
    MatSidenavModule, MatSidenav, MatInputModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDrawer,
    BtnComponent, IconComponent,
    SidebarComponent
  ]
})
export class AppComponent {
  @ViewChild('sidebar') sidebar!: MatSidenav
  title = 'UserManagement';
  userStateFacade = inject(UserStateFacade)
  authService = inject(AuthService)
  currentUser$ = this.userStateFacade.currentUser$;

  handleLogoutOutput() {
    this.logout();
  }

  logout() {
    this.authService.logout();
    this.sidebar.close();
  }
}
