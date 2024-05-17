export interface FindTagByRestaurantId {
  id_tag: number;
  id_restaurant: number;
}

export interface ResultFindTagByRestaurantId<T> {
  result: boolean;
  message: string;
  data: T;
}

export interface Tag {
  id: number;
  name: string;
  description: string;
}

export interface ResultTag<T> {
  result: boolean;
  message: string;
  data: T;
}
