import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MessageService } from '../services/lib/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  auth = inject(AuthService);
  ms = inject(MessageService);

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuth()) {
      return true;
    } else {
      this.router.navigate(['']);
      this.ms.error('Devi essere autenticato per accedere a questa pagina');
      return false;
    }
  }
}
