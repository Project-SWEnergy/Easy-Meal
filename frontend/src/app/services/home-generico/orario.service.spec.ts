import { TestBed } from '@angular/core/testing';
import axios from '../../../../axios-config';
import { OrarioService } from './orario.service';

describe('OrarioService', () => {
  let service: OrarioService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrarioService);
    axiosGetSpy = spyOn(axios, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getOrariByRestaurantId', () => {
    const restaurantId = 1;
    service.getOrariByRestaurantId(restaurantId).then((orari) => {
      expect(orari).toBeTruthy();
    });
    expect(axios.get).toHaveBeenCalledWith(
      `opening-hours/find-all-by-restaurant/${restaurantId}`,
    );
  });

  it('should return orari if response contains data', () => {
    const restaurantId = 1;
    const mockOrari = [
      {
        id: 1,
        id_restaurant: 1,
        id_day: 1,
        opening_time: '08:00',
        closing_time: '18:00',
      },
      {
        id: 2,
        id_restaurant: 1,
        id_day: 2,
        opening_time: '09:00',
        closing_time: '17:00',
      },
    ];

    axiosGetSpy.and.returnValue(Promise.resolve({ data: { data: mockOrari } }));

    service.getOrariByRestaurantId(restaurantId).then((orari) => {
      expect(orari).toEqual(mockOrari);
    });
  });

  it('should throw error if request fails', () => {
    const errorMessage = 'Test error message';

    axiosGetSpy.and.returnValue(Promise.reject(new Error(errorMessage)));

    service.getOrariByRestaurantId(1).catch((error) => {
      expect(error.message).toBe(errorMessage);
    });
  });

  it('should return nome giorno if response contains data', () => {
    const dayId = 1;
    const mockNomeGiorno = {
      id: 1,
      name: 'Monday',
      abbreviation: 'Mon',
      order: 1,
    };

    axiosGetSpy.and.returnValue(
      Promise.resolve({ data: { data: [mockNomeGiorno] } }),
    );

    service.getNomeGiorno(dayId).then((nomeGiorno) => {
      expect(nomeGiorno).toEqual(mockNomeGiorno);
    });
  });

  it('should throw error if request fails', () => {
    const errorMessage = 'Test error message';

    axiosGetSpy.and.returnValue(Promise.reject(new Error(errorMessage)));

    service.getNomeGiorno(1).catch((error) => {
      expect(error.message).toBe(errorMessage);
    });
  });
});
