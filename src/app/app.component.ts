import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet/>`,
})
export class AppComponent {
  title = 'UserManagement';
  authService = inject(AuthService)
  currentUser$ = this.authService.currentUser$;

  ngOnInit(){
    this.currentUser$.subscribe(x => {
      console.log('current user is ', x);
      
    })
  }
}
