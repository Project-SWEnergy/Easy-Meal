import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import axios from '../../../../axios-config';
import { ResultRecensione, Recensione } from '../../interfaces/recensione';

@Injectable({
  providedIn: 'root',
})
export class RecensioneService {
  private apiUrl = 'reviews/create';
  auth = inject(AuthService);
  user_id: number;

  constructor() {
    this.user_id = this.auth.get()!.id;
  }

  async creaRecensione(
    punteggio: number,
    idRestaurant: number,
    descrizione: string,
  ): Promise<ResultRecensione<any>> {
    const data = {
      id_restaurant: 1,
      id_user: this.user_id,
      date: new Date().toISOString(),
      score: punteggio,
      description: descrizione,
    };
    try {
      const response = await axios.post<ResultRecensione<any>>(
        this.apiUrl,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('Errore durante la creazione della recensione:', error);
      throw error;
    }
  }
}
