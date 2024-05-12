import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import axios from '../../../../axios-config';
import { Ingredient } from '../../interfaces/ingredienti';

@Injectable({
  providedIn: 'root',
})
export class IngredientiService {
  private ingredientUrl = 'ingredients/find-one/';
  private dishIngredientsUrl = 'dishes-ingredients/find-all-by-dish/';

  constructor() {}

  getIngredientsById(ingredientIds: number[]): Promise<Ingredient[]> {
    const ingredientRequests = ingredientIds.map((id) =>
      axios.get<{ data: Ingredient[] }>(`${this.ingredientUrl}${id}`),
    );
    return Promise.all(ingredientRequests)
      .then((responses: AxiosResponse<{ data: Ingredient[] }>[]) => {
        const ingredients: Ingredient[] = [];
        responses.forEach((response) => {
          if (
            response.data &&
            response.data.data &&
            response.data.data.length > 0
          ) {
            ingredients.push(response.data.data[0]);
          }
        });
        return ingredients;
      })
      .catch((error) => {
        throw error;
      });
  }

  getIngredientsByDishId(dishId: number): Promise<number[]> {
    const url = `${this.dishIngredientsUrl}${dishId}`;
    return axios
      .get<number[]>(url)
      .then((response: AxiosResponse<{ data: number[] }> | any) => {
        return response.data.data.map(
          (ingredient: any) => ingredient.id_ingredient,
        );
      })
      .catch((error) => {
        throw error;
      });
  }
}
