import { Injectable, inject } from '@angular/core';
import { OrderedDishes } from '../../interfaces/ordered-dishes';
import axios from '../../../../axios-config';
import { DishIngredient } from '../../interfaces/ingredient';
import { DishIngredientRistoratoreService } from './dish-ingredient.ristoratore.service';
import { MessageService } from '../lib/message.service';

@Injectable({
  providedIn: 'root',
})
export class OrderedDishesRistoratoreService {
  dis = inject(DishIngredientRistoratoreService);
  ms = inject(MessageService);

  constructor() { }

  async get_ordered_dishes(res_id: number): Promise<OrderedDishes[]> {
    return axios
      .get('ordered-dishes/find-all-by-reservation/' + res_id)
      .then((res) => {
        if (res && res.data && res.data.result) {
          return res.data.data;
        } else {
          throw new Error();
        }
      })
      .catch((_) => {
        this.ms.error('Errore nel recupero dei piatti ordinati');
      });
  }

  async get_ingredients_by_order(
    order: OrderedDishes,
  ): Promise<DishIngredient[]> {
    return this.dis
      .ingredients_in_dish(order.id_dish)
      .then((ings) =>
        ings.filter(
          (ing) =>
            !order.removed_ingredients
              .map((ri) => ri.id_ingredient)
              .includes(ing.id_ingredient),
        ),
      );
  }

  get_orders_grouped_by_user(orders: OrderedDishes[]): OrderedDishes[][] {
    let res = [];
    for (let order of orders) {
      let found = false;

      // check if the user is already in the list
      for (let group of res) {
        if (group[0].id_user === order.id_user) {
          group.push(order);
          found = true;
          break;
        }
      }

      // if the user is not in the list, create a new group
      if (!found) {
        res.push([order]);
      }
    }

    return res;
  }

  get_orders_price(orders: OrderedDishes[]): string {
    const p = orders.reduce((acc, el) => acc + el.price_dish, 0);
    return p.toFixed(2);
  }
}
