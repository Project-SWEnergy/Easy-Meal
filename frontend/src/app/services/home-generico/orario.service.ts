import { Injectable } from '@angular/core';
import { AxiosResponse } from 'axios';
import axios from '../../../../axios-config';
import {
  ResultFindHourByRestaurantId,
  FindHourByRestaurantId,
  ResultDays,
  Days,
} from '../../interfaces/orari';

@Injectable({
  providedIn: 'root',
})
export class OrarioService {
  constructor() {}

  async getOrariByRestaurantId(restaurantId: number): Promise<any[]> {
    try {
      const response: AxiosResponse<
        ResultFindHourByRestaurantId<FindHourByRestaurantId[]>
      > = await axios.get<
        ResultFindHourByRestaurantId<FindHourByRestaurantId[]>
      >(`opening-hours/find-all-by-restaurant/${restaurantId}`);
      const orari: FindHourByRestaurantId[] = response.data.data;
      const result: any[] = [];
      for (const orario of orari) {
        const giorno: Days = await this.getNomeGiorno(orario.id_day);
        result.push({
          id_day: orario.id_day,
          name: giorno.name,
          opening_time: orario.opening_time,
          closing_time: orario.closing_time,
        });
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getNomeGiorno(id_day: number): Promise<Days> {
    try {
      const response: AxiosResponse<ResultDays<Days[]>> = await axios.get<
        ResultDays<Days[]>
      >(`days-of-the-week/get-one-from-id/${id_day}`);
      return response.data.data[0];
    } catch (error) {
      throw error;
    }
  }
}
