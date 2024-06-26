import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Ingredient, IngredientCrate } from '../../interfaces/ingredient';
import axios from '../../../../axios-config';
import { MessageService } from '../lib/message.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientRistoratoreService {
  restaurant_id: number;
  auth = inject(AuthService);
  ms = inject(MessageService);

  constructor() {
    this.restaurant_id = this.auth.get()!.id;
  }

  async create(ing: IngredientCrate): Promise<Ingredient> {
    return await axios
      .post('ingredients/create', ing)
      .then((res) => {
        if (res && res.data && res.data.result) {
          this.ms.log('Ingrediente creato con successo');
          return res.data.data[0];
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('Errore nella creazione dell\'ingrediente');
      });
  }

  async get_one(id: number): Promise<Ingredient> {
    return axios
      .get('ingredients/find-one/' + id)
      .then((res) => {
        if (res && res.data && res.data.result) {
          return res.data.data[0];
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('Ingrediente non trovato');
      });
  }

  async get_all(): Promise<Ingredient[]> {
    return await axios
      .get('ingredients/find-all-by-restaurant')
      .then((res) => {
        if (res && res.data && res.data.result) {
          return res.data.data;
        } else {
          throw new Error();
        }
      })
      .catch((_) => {
        this.ms.error('Errore nel recupero degli ingredienti');
      });
  }

  async update(ing_id: number, ingredient: Ingredient): Promise<boolean> {
    return await axios
      .patch('ingredients/' + ing_id, ingredient)
      .then((response) => {
        if (response.data && response.data.result) {
          this.ms.log('Ingrediente aggiornato con successo')
          return true;
        } else {
          throw new Error();
        }
      })
      .catch((_) => {
        this.ms.error('Errore nell\'aggiornamento dell\'ingrediente')
        return false;
      });
  }

  async delete(ingredient_id: number): Promise<boolean> {
    return await axios
      .delete('ingredients/' + ingredient_id)
      .then((response) => {
        if (response.data && response.data.result) {
          this.ms.log('Ingrediente eliminato con successo');
          return true;
        } else {
          throw new Error();
        }
      })
      .catch((_) => {
        this.ms.error('Errore nell\'eliminazione dell\'ingrediente');
        return false;
      });
  }
}
