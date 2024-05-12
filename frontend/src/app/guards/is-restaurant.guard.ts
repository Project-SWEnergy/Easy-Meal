import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsRestaurantGuard implements CanActivate {
  constructor(private router: Router) {}

  auth = inject(AuthService);

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): boolean {
    if (this.auth.isRestaurant()) {
      return true;
    } else {
      this.router.navigate(['ristoratore/login']);
      return false;
    }
  }
}
