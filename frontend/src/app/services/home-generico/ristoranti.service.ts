import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import axios from '../../../../axios-config';
import { Ristorante, ResultRestaurants } from '../../interfaces/ristoranti';

@Injectable({
  providedIn: 'root',
})
export class RistorantiService {
  constructor() {}
  restaurantList: Ristorante[];

  async getAllRestaurants(): Promise<Ristorante[]> {
    try {
      const response: AxiosResponse<ResultRestaurants<Ristorante[]>> =
        await axios.get<ResultRestaurants<Ristorante[]>>(
          'restaurants/find-all',
        );
      const result = response.data;
      console.log('Response from API:', result); // Aggiunto per debug
      if (result.result && result.data) {
        this.restaurantList = result.data;
        return result.data;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error during API call:', error);
      throw error;
    }
  }

  async getRestaurantById(id: number): Promise<Ristorante | undefined> {
    try {
      const ristoranti: Ristorante[] = await this.getAllRestaurants();
      return ristoranti.find((ristorante) => ristorante.id === id);
    } catch (error) {
      console.error('Error while getting restaurant by ID:', error);
      throw error;
    }
  }
}
