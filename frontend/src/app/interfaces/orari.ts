export interface FindHourByRestaurantId {
  id: number;
  id_restaurant: number;
  id_day: number;
  opening_time: string;
  closing_time: string;
}

export interface ResultFindHourByRestaurantId<T> {
  result: boolean;
  message: string;
  data: T;
}

export interface Days {
  id: number;
  name: string;
  abbreviation: string;
  order: number;
}

export interface ResultDays<T> {
  result: boolean;
  message: string;
  data: T;
}
