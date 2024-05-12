export interface Ingredient {
  id: number;
  id_restaurant: number;
  name: string;
  unit_of_measurement: UnitOfMeasurement;
}

export interface IngredientCrate {
  name: string;
  unit_of_measurement: string;
}

export interface DishIngredient {
  id_dish: number;
  id_ingredient: number;
  quantity: number;
}

export interface IngredientOrdered {
  id: number;
  name: string;
  quantity: number;
  unit_of_measurement: UnitOfMeasurement;
}

export enum UnitOfMeasurement {
  g = 'g',
  ml = 'ml',
  pz = 'pz',
  qb = 'q.b.',
}
