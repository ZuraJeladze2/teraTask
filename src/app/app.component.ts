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
import { AsyncPipe, NgIf } from '@angular/common';
import { UserStateService } from './services/user-state.service';
import { SidebarComponent } from "./components/sidebar/sidebar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet, AsyncPipe, NgIf,
        MatSidenavModule, MatInputModule, MatIconModule, MatButtonModule, MatToolbarModule, MatDrawer,
        BtnComponent, IconComponent,
        SidebarComponent
    ]
})
export class AppComponent {
  title = 'UserManagement';
  userStateService = inject(UserStateService)
  authService = inject(AuthService)
  currentUser$ = this.userStateService.currentUser$;

  logout(){
    this.authService.logout();    
  }
}
