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

  constructor() {}

  async create(new_dish: DishCreate): Promise<Dish> {
    return axios
      .post('dishes/create', new_dish, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response && response.data && response.data.result) {
          this.ms.log('Dish created successfully');
          return response.data.data[0];
        } else {
          throw (
            response.data.message ??
            'Something went wrong in the creation of a new dish, no message from the backend provided'
          );
        }
      })
      .catch((err) => {
        this.ms.error(err);
      });
  }

  async get(dish_id: number): Promise<Dish> {
    return axios
      .get('dishes/find-one/' + dish_id)
      .then((response) => {
        console.log(response.data);
        if (response.data && response.data.result) {
          return response.data.data.map((elm: DishBackend) => toDish(elm))[0];
        } else {
          throw new Error();
        }
      })
      .catch((_) => {
        this.ms.error('Failed to get the dish');
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
          this.ms.log('Dish updated successfully');
          return true;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('Failed to update the dish');
        return false;
      });
  }

  async delete(dish_id: number): Promise<boolean> {
    return axios
      .delete('dishes/' + dish_id)
      .then((response) => {
        if (response.data && response.data.result) {
          this.ms.log('Dish deleted successfully');
          return true;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('Failed to delete the dish');
        return false;
      });
  }
}
