import { Injectable, inject } from '@angular/core';
import axios from '../../../../axios-config';
import { Reservation, ReservationUpdate } from '../../interfaces/reservation';
import { OrderedDishesRistoratoreService } from './ordered-dishes.ristoratore.service';
import { DishIngredient, IngredientOrdered } from '../../interfaces/ingredient';
import { IngredientRistoratoreService } from './ingredient.ristoratore.service';
import { MessageService } from '../lib/message.service';

@Injectable({
  providedIn: 'root',
})
export class ReservationRistoratoreService {
  ods = inject(OrderedDishesRistoratoreService);
  ing_service = inject(IngredientRistoratoreService);
  ms = inject(MessageService);

  constructor() {}

  async get(res_id: number): Promise<Reservation> {
    return axios
      .get('reservations/find-one/' + res_id)
      .then((res) => {
        if (res && res.data && res.data.result) {
          return res.data.data[0];
        } else {
          throw new Error();
        }
      })
      .catch((_) => {
        this.ms.error('No reservation found');
      });
  }

  async get_all(): Promise<Reservation[]> {
    return axios
      .get('reservations/find-all')
      .then((res) => {
        if (res && res.data && res.data.result) {
          return res.data.data;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('No reservations found');
        throw err;
      });
  }

  async update(
    updated_reservation: ReservationUpdate,
    res_id: number,
  ): Promise<boolean> {
    return axios
      .patch('reservations/' + res_id, updated_reservation)
      .then((res) => {
        if (res && res.data && res.data.result) {
          this.ms.log('Reservation updated successfully');
          return true;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('Failed to update reservation');
        return false;
      });
  }

  private reduce_ingredients(ingredients: DishIngredient[]): DishIngredient[] {
    let res: DishIngredient[] = [];
    for (let ing of ingredients) {
      if (!res.map((el) => el.id_ingredient).includes(ing.id_ingredient)) {
        res.push(ing);
      } else {
        let index = res.findIndex(
          (el) => el.id_ingredient === ing.id_ingredient,
        );
        res[index].quantity += ing.quantity;
      }
    }
    return res;
  }

  /** Given an array of reservations ids, returs the list of ingredients
   * to complete such reservations already reduced */
  async get_ingredients_by_reservations(
    res_ids: number[],
  ): Promise<IngredientOrdered[]> {
    const ordered_dishes = await Promise.all(
      res_ids.map((res_id) => this.ods.get_ordered_dishes(res_id)),
    ).then((res) => res.flat());

    const ingredients = await Promise.all(
      ordered_dishes.map((ordered_dish) =>
        this.ods.get_ingredients_by_order(ordered_dish),
      ),
    ).then((res) => res.flat());

    return this.ing_to_ordered_ing(this.reduce_ingredients(ingredients));
  }

  private async ing_to_ordered_ing(
    ing: DishIngredient[],
  ): Promise<IngredientOrdered[]> {
    const restaurant_ings = await this.ing_service.get_all();
    return ing.map((ing) => {
      const restaurant_ing = restaurant_ings.find(
        (restaurant_ing) => restaurant_ing.id === ing.id_ingredient,
      );
      return {
        ...ing,
        name: restaurant_ing!.name,
        unit_of_measurement: restaurant_ing!.unit_of_measurement,
        id: restaurant_ing!.id,
      };
    });
  }

  get_reservations_date(reservations: Reservation[]): {
    in_attesa: string[];
    waiting: string[];
    ended: string[];
    canceled: string[];
  } {
    let in_attesa: string[] = [];
    let waiting: string[] = [];
    let ended: string[] = [];
    let canceled: string[] = [];

    for (let r of reservations) {
      const date = r.date.substring(0, 10);
      if (r.reservation_state === 'In attesa' && !in_attesa.includes(date)) {
        in_attesa.push(date);
      } else if (
        (r.reservation_state === 'Approvata' ||
          r.reservation_state === 'In corso' ||
          r.reservation_state === 'Pagamento') &&
        !waiting.includes(date)
      ) {
        waiting.push(date);
      } else if (r.reservation_state === 'Conclusa' && !ended.includes(date)) {
        ended.push(date);
      } else {
        canceled.push(date);
      }
    }

    return { in_attesa, waiting, ended, canceled };
  }
}
