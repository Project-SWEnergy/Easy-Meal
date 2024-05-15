import { Injectable, inject } from '@angular/core';
import axios from '../../../../axios-config';

@Injectable({
  providedIn: 'root',
})
export class SubmitService<T, E> {
  private api_url: string;
  private field_to_access: string;

  /**
   * setta l'url dell'api presso cui eseguire la post request
   * @param { string } - Url dell'api
   * @returns { SubmitService<T, E> } - the item itself
   */
  api(url: string): this {
    this.api_url = url;
    return this;
  }

  /**
   * setta il field a cui accedere nella risposta alla post request
   * @param { string } - Field a cui accedere
   * @returns { SubmitService<T, E> } - the item itself
   */
  field(fta: string): this {
    this.field_to_access = fta;
    return this;
  }

  /**
   * esegue la post request sull'api specificata con i parametri passati
   * @param { T } params - Credenziali da controllare
   * @returns { E } - Data corresponding to the given api
   */
  async post(params: T): Promise<E> {
    return axios
      .post(this.api_url, params)
      .then((response) => {
        if (response.data && response.data.result) {
          return response.data[this.field_to_access];
        } else {
          throw new Error()
        }
      })
      .catch((_) => {
        throw new Error()
      });
  }
}
