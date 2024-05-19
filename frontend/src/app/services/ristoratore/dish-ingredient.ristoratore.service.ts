import { Injectable, inject } from '@angular/core';
import { IngredientRistoratoreService } from './ingredient.ristoratore.service';
import { Ingredient, DishIngredient } from '../../interfaces/ingredient';
import axios from '../../../../axios-config';
import { MessageService } from '../lib/message.service';

@Injectable({
  providedIn: 'root',
})
export class DishIngredientRistoratoreService {
  ingredient_service = inject(IngredientRistoratoreService);
  ingredients: Ingredient[];
  ms = inject(MessageService);

  constructor() {
    this.get_all_ingredients();
  }

  private async get_all_ingredients(): Promise<boolean> {
    return await this.ingredient_service
      .get_all()
      .then((res) => {
        this.ingredients = res;
        return true;
      })
      .catch((err) => {
        this.ms.error("Errore nel recupero degli ingredienti");
        return false;
      });
  }

  async ingredients_in_dish(dish_id: number): Promise<DishIngredient[]> {
    return await axios
      .get('dishes-ingredients/find-all-by-dish/' + dish_id)
      .then((res) => {
        if (res && res.data && res.data.result) {
          return res.data.data;
        } else {
          throw new Error();
        }
      })
      .catch((_) => this.ms.error('Errore nel recupero degli ingredienti del piatto'));
  }

  private async take_off_existing(dish_id: number): Promise<boolean> {
    let ids = (await this.ingredients_in_dish(dish_id)).map(
      (elm) => elm.id_ingredient,
    );
    this.ingredients = this.ingredients.filter((ing) => !ids.includes(ing.id));
    return true;
  }

  async get(dish_id: number): Promise<Ingredient[]> {
    await this.get_all_ingredients();
    await this.take_off_existing(dish_id);
    return this.ingredients;
  }

  async create(params: DishIngredient): Promise<boolean> {
    return axios
      .post('dishes-ingredients/create', [params])
      .then(async (res) => {
        if (res && res.data && !res.data.result) {
          throw new Error();
        } else {
          this.ms.log('Collegamento tra piatto e ingrediente creato con successo');
          this.ingredients = await this.get(params.id_dish);
          return true;
        }
      })
      .catch((_) => {
        this.ms.error(
          'Errore nella creazione del collegamento tra il piatto e l\'ingrediente'
        );
        return false;
      });
  }

  async update(params: DishIngredient): Promise<boolean> {
    return axios
      .patch(
        'dishes-ingredients/' + params.id_dish + '/' + params.id_ingredient,
        params,
      )
      .then((res) => {
        if (res && res.data && res.data.result) {
          this.ms.log('Collegamento tra piatto e ingrediente aggiornato con successo');
          return true;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error(
          'Errore nell\'aggiornamento di un collegamento tra piatto e ingrediente'
        );
        return false;
      });
  }

  async delete(params: DishIngredient): Promise<boolean> {
    return axios
      .delete(
        'dishes-ingredients/' + params.id_dish + '/' + params.id_ingredient,
      )
      .then(async (res) => {
        if (res && res.data && res.data.result) {
          this.ms.log('Eliminazione di un collegamento tra piatto e ingrediente riuscita con successo')
          this.ingredients = await this.get(params.id_dish);
          return true;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error(
          'Errore nell\'eliminazione di un collegamento tra piatto e ingrediente'
        );
        return false;
      });
  }
}
