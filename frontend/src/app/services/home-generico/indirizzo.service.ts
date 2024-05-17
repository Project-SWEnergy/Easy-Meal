import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import axios from '../../../../axios-config';
import { AxiosResponse } from 'axios';
import { Indirizzo, ResultAddress } from '../../interfaces/address';

@Injectable({
  providedIn: 'root',
})
export class IndirizzoService {
  constructor() {}

  getAddressByRestaurantId(restaurantId: number): Promise<Indirizzo> {
    return axios
      .get<
        ResultAddress<Indirizzo[]>
      >(`addresses/find-by-restaurantId/${restaurantId}`)
      .then((response: AxiosResponse<ResultAddress<Indirizzo[]>>) => {
        const result = response.data;
        if (result.result && result.data && result.data.length > 0) {
          return result.data[0]; // Restituisci il primo indirizzo dall'array
        } else {
          throw new Error(result.message);
        }
      });
  }
}
