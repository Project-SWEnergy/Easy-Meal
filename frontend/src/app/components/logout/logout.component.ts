import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  constructor(
    private router: Router,
    private auth: AuthService,
  ) {
    this.auth.logout().then((_) => {
      this.router.navigate(['/']);
    });
  }
}
