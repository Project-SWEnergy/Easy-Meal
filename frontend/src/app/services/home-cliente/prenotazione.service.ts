import { inject, Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import axios from '../../../../axios-config';
import {
  Prenotazione,
  ResultPrenotazione,
  PrenotazioneData,
  InvitoPrenotazione,
} from '../../interfaces/prenotazione';
import {
  FindPrenotazionResult,
  FindPrenotazioni,
} from '../../interfaces/prenotazione';

@Injectable({
  providedIn: 'root',
})
export class PrenotazioneService {
  private apiUrl = 'reservations/create';
  private userReservationUrl = 'users-reservations/create';
  private inviteUrl = 'users-reservations/invite';
  private findPrenotazioniUrl = 'users-reservations/find-all-by-user';
  private findPrenatzioniByReservationUrl =
    'users-reservations/find-all-by-reservation';
  private cancellaPrenotazioneUrl = 'users-reservations';
  private accettaPrenotazioneUrl = 'users-reservations';

  private prenotazioneId: number;
  auth = inject(AuthService);
  user_id: number;

  constructor() {
    this.user_id = this.auth.get()!.id;
  }

  async findPrenotazioniByReservation(
    idReservation: number,
  ): Promise<FindPrenotazioni[]> {
    try {
      const response = await axios.get<{ data: FindPrenotazioni[] }>(
        this.findPrenatzioniByReservationUrl + `/${idReservation}`,
      );
      return response.data.data;
    } catch (error) {
      console.error(
        'Errore durante il recupero delle prenotazioni della prenotazione:',
        error,
      );
      throw error;
    }
  }

  async creaPrenotazione(data: Prenotazione): Promise<number> {
    try {
      const response = await axios.post<ResultPrenotazione<PrenotazioneData[]>>(
        this.apiUrl,
        data,
      );
      const prenotazioneData = response.data.data[0];
      const prenotazioneId = prenotazioneData.id;
      await this.associaPrenotazione(prenotazioneId);
      return prenotazioneId;
    } catch (error) {
      console.error('Errore durante la creazione della prenotazione:', error);
      throw error;
    }
  }

  async invitaPrenotazione(
    idReservation: number,
    emails: any[],
  ): Promise<void> {
    const invito: InvitoPrenotazione = {
      email_users: emails,
      id_reservation: idReservation,
    };

    try {
      await axios.post(this.inviteUrl, invito);
    } catch (error) {
      console.error(
        "Errore durante l'invio degli inviti alla prenotazione:",
        error,
      );
      throw error;
    }
  }

  async associaPrenotazione(idPrenotazione: number): Promise<void> {
    try {
      await axios.post(this.userReservationUrl, {
        id_reservation: idPrenotazione,
      });
    } catch (error) {
      console.error(
        "Errore durante l'associazione dell'id della prenotazione:",
        error,
      );
      throw error;
    }
  }

  async findPrenotazioniByUser(): Promise<FindPrenotazioni[]> {
    try {
      const response = await axios.get<
        FindPrenotazionResult<FindPrenotazioni[]>
      >(this.findPrenotazioniUrl);
      return response.data.data;
    } catch (error) {
      console.error(
        "Errore durante il recupero delle prenotazioni dell'utente:",
        error,
      );
      throw error;
    }
  }

  async deletePrenotazione(idReservation: number): Promise<void> {
    try {
      await axios.delete(`${this.cancellaPrenotazioneUrl}/${idReservation}`);
    } catch (error) {
      console.error(
        'Errore durante la cancellazione della prenotazione:',
        error,
      );
      throw error;
    }
  }

  async acceptPrenotazione(idReservation: number): Promise<void> {
    try {
      await axios.patch(`${this.accettaPrenotazioneUrl}/${idReservation}`, {
        accepted: true,
      });
    } catch (error) {
      console.error("Errore durante l'accettazione della prenotazione:", error);
      throw error;
    }
  }
}
