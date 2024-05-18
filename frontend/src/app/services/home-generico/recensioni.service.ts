import { Injectable, inject } from '@angular/core';
import { AxiosResponse } from 'axios';
import axios from '../../../../axios-config';
import { Recensione } from '../../interfaces/recensioni';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class RecensioniService {
  private url = 'reviews/find-all-by-restaurant/';
  auth = inject(AuthService);

  constructor() { }

  async getReviewByRestaurantId(restaurantId: number): Promise<Recensione[]> {
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

  async hasUserReviewed(restaurantId: number): Promise<boolean> {
    const reviews = await this.getReviewByRestaurantId(restaurantId);
    const userId = this.auth.get()?.id;
    return reviews.filter(rev => rev.id_user === userId).length > 0;
  }
}