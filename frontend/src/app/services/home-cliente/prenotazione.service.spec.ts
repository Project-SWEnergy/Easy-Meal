import { TestBed } from '@angular/core/testing';
import axios from '../../../../axios-config';
import { AuthService } from '../auth.service';
import { PrenotazioneService } from './prenotazione.service';

describe('PrenotazioneService', () => {
  let service: PrenotazioneService;
  let authService: AuthService;
  let prenotazioneId: number; // Aggiungiamo questa variabile

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        PrenotazioneService,
        {
          provide: AuthService,
          useValue: {
            isUser: () => true,
            get: () => ({ id: 1 }),
          },
        },
      ],
    });
    service = TestBed.inject(PrenotazioneService);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a reservation', async () => {
    const mockResponse = {
      result: true,
      message: 'Reservation created successfully',
      data: [
        {
          id: 1,
          id_restaurant: 1,
          date: '2023-05-10',
          partecipants: 4,
          reservation_state: 'confirmed',
          bill_splitting_method: 'equal',
          paid_orders: 0,
        },
      ],
    };

    spyOn(axios, 'post').and.returnValue(
      Promise.resolve({ data: mockResponse }),
    );

    const data = {
      restaurantId: 1,
      date: '2023-05-10',
      partecipants: 4,
      reservation_state: 'confirmed',
      bill_splitting_method: 'equal',
    };

    const result = await service.creaPrenotazione(data);
    expect(result).toEqual(mockResponse.data[0]);

    // Utilizziamo la riflessione per accedere alla variabile privata prenotazioneId
    const prenotazioneIdField = (service as any)['prenotazioneId'];
    expect(prenotazioneIdField).toEqual(1);
  });

  it('should invite users to a reservation', async () => {
    const emails = ['email1@example.com', 'email2@example.com'];

    spyOn(axios, 'post').and.returnValue(Promise.resolve());

    await service.invitaPrenotazione(emails);

    // Utilizziamo la riflessione per accedere alla variabile privata prenotazioneId
    const prenotazioneIdField = (service as any)['prenotazioneId'];
    expect(axios.post).toHaveBeenCalledWith('users-reservations/invite', {
      email_users: emails,
      id_reservation: prenotazioneIdField,
    });
  });

  it('should find reservations by user', async () => {
    const mockResponse = {
      result: true,
      message: 'Reservations found successfully',
      data: [
        {
          id_user: 1,
          name_user: 'John',
          surname_user: 'Doe',
          id_reservation: 1,
          id_restaurant: 1,
          name_restaurant: 'Restaurant',
          date: '2023-05-10',
          partecipants: 4,
          state: 'confirmed',
          bill_splitting_method: 'equal',
          accepted: true,
        },
      ],
    };

    spyOn(axios, 'get').and.returnValue(
      Promise.resolve({ data: mockResponse }),
    );

    const result = await service.findPrenotazioniByUser();
    expect(result).toEqual(mockResponse.data);
  });

  it('should throw an error if the reservation creation fails', async () => {
    spyOn(axios, 'post').and.returnValue(Promise.reject('Error'));

    const data = {
      restaurantId: 1,
      date: '2023-05-10',
      partecipants: 4,
      reservation_state: 'confirmed',
      bill_splitting_method: 'equal',
    };

    try {
      await service.creaPrenotazione(data);
    } catch (error) {
      expect(error).toEqual('Error');
    }
  });

  it('should throw an error if the find reservations by user fails', async () => {
    spyOn(axios, 'get').and.returnValue(Promise.reject('Error'));

    try {
      await service.findPrenotazioniByUser();
    } catch (error) {
      expect(error).toEqual('Error');
    }
  });

  it('should delete a reservation', async () => {
    const idReservation = 1;

    spyOn(axios, 'delete').and.returnValue(Promise.resolve());

    await service.deletePrenotazione(idReservation);

    expect(axios.delete).toHaveBeenCalledWith('users-reservations/1');
  });

  it('should throw an error if the delete reservation fails', async () => {
    spyOn(axios, 'delete').and.returnValue(Promise.reject('Error'));

    try {
      await service.deletePrenotazione(1);
    } catch (error) {
      expect(error).toEqual('Error');
    }
  });

  it('should accept a reservation', async () => {
    const idReservation = 1;
    const accepted = true;

    spyOn(axios, 'patch').and.returnValue(Promise.resolve());

    await service.acceptPrenotazione(idReservation);

    expect(axios.patch).toHaveBeenCalledWith('users-reservations/1', {
      accepted,
    });
  });

  it('should throw an error if the accept reservation fails', async () => {
    spyOn(axios, 'patch').and.returnValue(Promise.reject('Error'));

    try {
      await service.acceptPrenotazione(1);
    } catch (error) {
      expect(error).toEqual('Error');
    }
  });

  it('should handle error during invitation', async () => {
    const emails = ['email1@example.com', 'email2@example.com'];

    spyOn(axios, 'post').and.throwError('Invitation error');

    try {
      await service.invitaPrenotazione(emails);
      fail('The function should throw an error');
    } catch (error: any) {
      expect(error.message).toBe('Invitation error');
    }
  });
});
