export interface FindIngredientsByDishId {
  id_dish: number;
  id_ingredient: number;
  quantity: number;
}

export interface ResultFindIngredientsByDishId<T> {
  result: boolean;
  message: string;
  data: T;
}

export interface Ingredient {
  id: number;
  id_restaurant: number;
  name: string;
  unity_of_measurement: string;
}

export interface ResultIngredient<T> {
  result: boolean;
  message: string;
  data: T;
}
