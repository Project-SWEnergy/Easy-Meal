import { Injectable, inject } from '@angular/core';
import axios from '../../../../axios-config';
import {
  OpeningHoursCreate,
  RestaurantCreate,
} from '../../interfaces/restaurant';
import { AuthService } from '../auth.service';
import { MessageService } from '../lib/message.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantRistoratoreService {
  auth = inject(AuthService);
  ms = inject(MessageService);

  private async create_restaurant(n_r: RestaurantCreate) {
    await axios
      .post('restaurants/create', n_r, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res && res.data && res.data.result) {
          this.ms.log('Ristorante creato con successo');
          return res.data.data;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error('Errore nella creazione del ristorante');
      });
  }

  private async opening_hours_create(n_h: OpeningHoursCreate[]) {
    n_h.forEach(async (hour) => {
      hour.opening_time = hour.opening_time + ':00';
      hour.closing_time = hour.closing_time + ':00';
    });

    await axios
      .post('opening-hours/create', n_h)
      .then((res) => {
        if (res && res.data && res.data.result) {
          return true;
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        this.ms.error(
          'Errore nella creazione degli orari di apertura del ristorante'
        );
      });
  }

  async create(
    new_restaurant: RestaurantCreate,
    new_hours: OpeningHoursCreate[],
  ): Promise<boolean> {
    try {
      // 1. crea ristorante (con indirizzo)
      await this.create_restaurant(new_restaurant);

      // 2. salva le credenziali di login
      await this.auth.auth();

      // 3. crea gli orari di apertura
      await this.opening_hours_create(new_hours);
    } catch (e) {
      this.ms.error('Errore nella creazione del ristorante');
    }
    return true;
  }

  /*
  update() {
    // 1. sono modificate le immagini
    // 2. sono modificati gli orari del ristorante
  }

  get() {
    // 1. viene eseguita la get del ristorante
    // 2. sono ritorante le informazioni del ristorante, come in registrazione
  }
  */
}
