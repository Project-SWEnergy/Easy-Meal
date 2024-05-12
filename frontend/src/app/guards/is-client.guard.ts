import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const isClientGuard: CanActivateFn = (_route, _state) => {
  const auth = inject(AuthService);
  console.log(auth.get());
  if (auth.isUser()) {
    return true;
  }
  return false;
};
