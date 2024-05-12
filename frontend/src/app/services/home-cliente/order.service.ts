import { inject, Injectable } from '@angular/core';
import axios from '../../../../axios-config';
import { OrderedDish } from '../../interfaces/order';
import { from } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  auth = inject(AuthService);
  user_id: number;

  constructor() {
    this.user_id = this.auth.get()!.id;
    console.log("l'id è: " + this.user_id);
  }

  getOrderedDishesByReservation(reservationId: number): Promise<OrderedDish[]> {
    const url = `ordered-dishes/find-all-by-reservation/${reservationId}`;
    return axios.get(url).then((response) => response.data.data);
  }

  getOrderedDishesByUser(reservationId: number): Promise<OrderedDish[]> {
    const url = `ordered-dishes/find-all-by-user/${this.user_id}/${reservationId}`;
    return axios.get(url).then((response) => response.data.data);
  }

  async didUserPaid(idRestaurant: number): Promise<boolean> {
    console.log("l'id è: " + this.user_id, idRestaurant);
    const url = `bills/did-user-paid-once/${this.user_id}/${idRestaurant}`;
    try {
      const response = await axios.get(url);
      return response.data.data;
    } catch (error) {
      console.error('Errore durante la richiesta API:', error);
      throw error;
    }
  }
}
