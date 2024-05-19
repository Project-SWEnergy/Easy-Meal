import { Injectable, inject } from '@angular/core';
import axios from '../../../../axios-config';
import { Dish, DishBackend, toDish } from '../../interfaces/dish';
import { AuthService } from '../auth.service';
import { MessageService } from '../lib/message.service';

@Injectable({
  providedIn: 'root',
})
export class DishesRistoratoreService {
  auth = inject(AuthService);
  ms = inject(MessageService);
  id: number;

  constructor() {
    this.id = this.auth.get()!.id;
  }

  async get(): Promise<Dish[]> {
    return await axios
      .get('dishes/find-all/' + this.id)
      .then((response) => {
        if (response.data && response.data.result) {
          return response.data.data.map((elm: DishBackend) => {
            return toDish(elm);
          });
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('Errore nel recupero dei piatti');
      });
  }
}
