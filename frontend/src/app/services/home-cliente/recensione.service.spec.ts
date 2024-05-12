import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import axios from '../../../../axios-config';
import { RecensioneService } from './recensione.service';

describe('RecensioneService', () => {
  let service: RecensioneService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            isUser: () => true,
            get: () => ({ id: 1 }),
          },
        },
      ],
    });
    service = TestBed.inject(RecensioneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a review successfully', async () => {
    const punteggio = 5;
    const idRestaurant = 1;
    const descrizione = 'Eccellente servizio';

    const mockResponse = {
      result: true,
      message: 'Review created successfully',
      data: {
        id_restaurant: 1,
        name_restaurant: 'Ristorante XYZ',
        id_user: 1,
        name_user: 'Utente Test',
        date: '2024-05-10T12:00:00.000Z',
        score: 5,
        description: 'Eccellente servizio',
      },
    };

    spyOn(axios, 'post').and.returnValue(
      Promise.resolve({ data: mockResponse }),
    );

    const result = await service.creaRecensione(
      punteggio,
      idRestaurant,
      descrizione,
    );

    expect(result).toEqual(mockResponse);
  });

  it('should handle error when creating a review', async () => {
    const punteggio = 3;
    const idRestaurant = 2;
    const descrizione = 'Recensione test';

    const mockError = new Error('API error');
    spyOn(axios, 'post').and.returnValue(Promise.reject(mockError));

    try {
      await service.creaRecensione(punteggio, idRestaurant, descrizione);
    } catch (error) {
      expect(error).toBe(mockError);
    }
  });

  it('should initialize user_id in constructor', () => {
    expect(service.user_id).toBe(1); // L'id dell'utente deve essere impostato a 1 nel nostro mock AuthService
  });
});
