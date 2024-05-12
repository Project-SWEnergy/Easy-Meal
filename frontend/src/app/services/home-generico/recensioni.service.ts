import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import axios from '../../../../axios-config';
import { Recensione } from '../../interfaces/recensioni';

@Injectable({
  providedIn: 'root',
})
export class RecensioniService {
  private url = 'reviews/find-all-by-restaurant/';

  constructor() {}

  getReviewByRestaurantId(restaurantId: number): Promise<Recensione[]> {
    const url = `${this.url}${restaurantId}`;
    return axios
      .get<Recensione[]>(url)
      .then((response: AxiosResponse<{ data: Recensione[] }> | any) => {
        return response.data.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
