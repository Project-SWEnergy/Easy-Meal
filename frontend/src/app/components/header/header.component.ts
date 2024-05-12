import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationLinkComponent } from '../notification-link/notification-link.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    NotificationLinkComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  url_login: string;
  url_registrazione: string;
  auth = inject(AuthService);

  constructor(private router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
