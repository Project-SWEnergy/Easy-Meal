import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/authentication';
import axios from '../../../axios-config';
import { MessageService } from './lib/message.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  ms = inject(MessageService);

  constructor() { }

  /** User if the User if the user is authenticated, null otherwise */
  get(): User | null {
    const data = localStorage.getItem('token');
    if (!data) {
      return null;
    }
    const user = JSON.parse(data);

    if (this.isOk(user)) {
      return user;
    } else {
      localStorage.removeItem('token');
      return null;
    }
  }

  /** true if the user (parameter in input) implement the User interface, false otherwise */
  private isOk(user: any): user is User {
    return (
      user &&
      typeof user.id === 'number' &&
      (user.role === 'user' || user.role === 'restaurant')
    );
  }

  /** true if the user is authenticated, false otherwise */
  isAuth(): boolean {
    const user = this.get();
    if (!this.isOk(user)) {
      return false;
    }
    return true;
  }

  /** Save the user in local storage */
  async auth() {
    const user = await axios
      .get('authentication/setup')
      .then((res) => {
        if (res && res.data && res.data.result) {
          return res.data.data[0];
        } else {
          throw new Error();
        }
      })
      .catch((_) => this.ms.error('Errore nel recupero dell\'utente'));

    if (this.isOk(user)) {
      localStorage.setItem('token', JSON.stringify(user));
    } else {
      this.ms.error('Errore nel recupero dell\'utente');
    }
  }

  /** Get the role of the user */
  private role(): 'user' | 'restaurant' | null {
    const user = this.get();
    if (this.isOk(user)) {
      return user.role as 'user' | 'restaurant';
    }
    return null;
  }

  /** true if the user is a restaurant, false otherwise */
  isRestaurant(): boolean {
    if (this.role() === 'restaurant') {
      return true;
    }
    return false;
  }

  /** true if the user is a standard client, false otherwise */
  isUser(): boolean {
    if (this.role() === 'user') {
      return true;
    }
    return false;
  }

  /** logout */
  async logout(): Promise<void> {
    await axios
      .post('authentication/signout')
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.message &&
          res.data.message === 'Logout successful'
        ) {
          this.ms.log('Logout avvenuto con successo');
        } else {
          throw new Error();
        }
      })
      .catch((_) => {
        return;
      });
    localStorage.removeItem('token');
  }
}
