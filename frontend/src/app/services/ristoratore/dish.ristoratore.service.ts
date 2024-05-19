import { Injectable, inject } from '@angular/core';
import axios from '../../../../axios-config';
import { DishBackend, toDish, Dish, DishCreate } from '../../interfaces/dish';
import { SubmitService } from '../lib/submit.service';
import { MessageService } from '../lib/message.service';

@Injectable({
  providedIn: 'root',
})
export class DishRistoratoreService {
  new_dish_service = inject(SubmitService<DishCreate, Dish[]>);
  ms = inject(MessageService);

  constructor() { }

  async create(new_dish: DishCreate): Promise<Dish> {
    return axios
      .post('dishes/create', new_dish, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response && response.data && response.data.result) {
          this.ms.log('Piatto creato con successo');
          return response.data.data[0];
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('Errore nella creazione del piatto');
      });
  }

  async get(dish_id: number): Promise<Dish> {
    return axios
      .get('dishes/find-one/' + dish_id)
      .then((response) => {
        if (response.data && response.data.result) {
          return response.data.data.map((elm: DishBackend) => toDish(elm))[0];
        } else {
          throw new Error();
        }
      })
      .catch((_) => {
        this.ms.error('Errore nel recupero del piatto');
      });
  }

  async update(dish: Dish): Promise<boolean> {
    return axios
      .patch('dishes/' + dish.id, dish, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response && response.data && response.data.result) {
          this.ms.log('Piatto aggiornato con successo');
          return true;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('Errore nell\'aggiornamento del piatto');
        return false;
      });
  }

  async delete(dish_id: number): Promise<boolean> {
    return axios
      .delete('dishes/' + dish_id)
      .then((response) => {
        if (response.data && response.data.result) {
          this.ms.log('Piatto eliminato con successo');
          return true;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('Errore nell\'eliminazione del piatto');
        return false;
      });
  }
}
