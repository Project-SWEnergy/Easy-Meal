export interface OrderedDish {
  id: number;
  id_ordered_dish: number;
  id_user: number;
  name_user: string;
  surname_user: string;
  id_reservation: number;
  id_dish: number;
  name_dish: string;
  image_dish: string;
  price_dish: number;
  paid: boolean;
  removed_ingredients: RemovedIngredient[];
}

export interface RemovedIngredient {
  id_ingredient: number;
  name_ingredient: string;
}

export interface ApiResult {
  result: boolean;
  message: string;
  data: OrderedDish[];
}
