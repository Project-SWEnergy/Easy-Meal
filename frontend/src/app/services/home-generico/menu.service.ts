import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import axios from '../../../../axios-config';
import { Dish } from '../../interfaces/dish';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuUrl = 'dishes/find-all/';

  constructor() {}

  getMenuByRestaurantId(restaurantId: number): Promise<Dish[]> {
    const url = `${this.menuUrl}${restaurantId}`;
    return axios
      .get<Dish[]>(url)
      .then((response: AxiosResponse<{ data: Dish[] }> | any) => {
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
