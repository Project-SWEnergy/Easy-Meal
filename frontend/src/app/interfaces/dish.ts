export interface Dish {
  id: number;
  id_restaurant: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface DishCreate {
  name: string;
  description: string;
  price: string;
  image: string;
  file: File;
}

export interface DishBackend {
  id: number;
  id_restaurant: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export function toDish(dish: DishBackend): Dish {
  return {
    id: dish.id,
    id_restaurant: dish.id_restaurant,
    name: dish.name,
    description: dish.description,
    price: parseFloat(dish.price),
    image: dish.image,
  } as Dish;
}
