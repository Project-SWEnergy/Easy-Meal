import { Injectable, inject } from '@angular/core';
import { Weekday } from '../../interfaces/weekday';
import axios from '../../../../axios-config';
import { MessageService } from '../lib/message.service';

@Injectable({
  providedIn: 'root',
})
export class WeekDaysRistoratoreService {
  ms = inject(MessageService);

  async get(): Promise<Weekday[]> {
    return axios
      .get('days-of-the-week/find-all')
      .then((res) => {
        if (res && res.data && res.data.result) {
          return res.data.data;
        } else {
          throw new Error();
        }
      })
      .then((weekdays: Weekday[]) => {
        return weekdays.sort((a, b) => a.order - b.order);
      })
      .catch((err) => {
        this.ms.error('Network error');
        return [];
      });
  }
}
