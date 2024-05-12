import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import axios from '../../../../axios-config';
import {
  ResultPrenotazioneBill,
  Prenotazioni,
  ResultPrenotazioni,
  PrenotazioneBill,
  UserBill,
  PagamentoIndividuale,
  PagamentoEquidiviso,
} from '../../interfaces/pagamento';

@Injectable({
  providedIn: 'root',
})
export class PagamentoService {
  auth = inject(AuthService);
  user_id: number;

  constructor() {
    this.user_id = this.auth.get()!.id;
  }

  getUserTotalBill(
    reservationId: number,
  ): Promise<ResultPrenotazioneBill<UserBill[]>> {
    return axios
      .get<ResultPrenotazioneBill<UserBill[]>>(
        `ordered-dishes/user-total-bill/${this.user_id}/${reservationId}`,
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  }

  getReservationTotalBill(
    reservationId: number,
  ): Promise<ResultPrenotazioni<PrenotazioneBill[]>> {
    return axios
      .get<ResultPrenotazioni<PrenotazioneBill[]>>(
        `ordered-dishes/reservation-total-bill/${reservationId}`,
      )
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  }

  createIndividualBill(billData: PagamentoIndividuale): Promise<any> {
    return axios
      .post('bills/create-proportional', billData)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  }

  createEqualBill(billData: PagamentoEquidiviso): Promise<any> {
    return axios
      .post('bills/create-equidivided', billData)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response.data;
      });
  }
}
