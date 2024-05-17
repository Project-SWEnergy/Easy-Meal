import { Injectable } from '@angular/core';
import axios from '../../../axios-config';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private auth: AuthService) {}
}
