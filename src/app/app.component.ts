import { AsyncPipe, NgIf } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BtnComponent } from "./components/btn/btn.component";
import { IconComponent } from "./components/icon/icon.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserStateFacade } from './facades/user-state.facade';
import { AuthService } from './services/auth.service';

/**
 * Description placeholder
 *
 * @export
 * @class AppComponent
 * @typedef {AppComponent}
 */
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet, AsyncPipe, NgIf, RouterLink,
    MatSidenavModule, MatSidenav, MatInputModule, MatIconModule, MatButtonModule, MatToolbarModule,
    BtnComponent, IconComponent,
    SidebarComponent
  ]
})
export class AppComponent {
  /**
   * Description placeholder
   *
   * @type {!MatSidenav}
   */
  @ViewChild('sidebar') sidebar!: MatSidenav
  /**
   * Description placeholder
   *
   * @type {string}
   */
  title = 'UserManagement';
  /**
   * Description placeholder
   *
   * @type {*}
   */
  userStateFacade = inject(UserStateFacade)
  /**
   * Description placeholder
   *
   * @type {*}
   */
  authService = inject(AuthService)
  /**
   * Description placeholder
   *
   * @type {*}
   */
  currentUser$ = this.userStateFacade.currentUser$;

  /**
   * Description placeholder
   */
  handleLogoutOutput() {
    this.logout();
  }

  /**
   * Description placeholder
   */
  logout() {
    this.authService.logout();
    this.sidebar.close();
  }
}
