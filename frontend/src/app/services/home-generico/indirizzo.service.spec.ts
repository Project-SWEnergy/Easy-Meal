import { TestBed, inject } from '@angular/core/testing';
import { IndirizzoService } from './indirizzo.service';
import axios from '../../../../axios-config';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Indirizzo, ResultAddress } from '../../interfaces/address';

describe('IndirizzoService', () => {
  let service: IndirizzoService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndirizzoService],
    });
    service = TestBed.inject(IndirizzoService);
    axiosGetSpy = spyOn(axios, 'get'); // Spy sulla funzione axios.get
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return address by restaurant ID', () => {
    const restaurantId = 1;
    const mockIndirizzo: Indirizzo = {
      id: 1,
      city: 'Test City',
      street: 'Test Street',
      street_number: '123',
      state: 'Test State',
      zip_code: '12345',
    };
    const mockResponse: ResultAddress<Indirizzo[]> = {
      result: true,
      message: '',
      data: [mockIndirizzo],
    };

    axiosGetSpy.and.returnValue(Promise.resolve({ data: mockResponse })); // Simula la chiamata axios.get

    service.getAddressByRestaurantId(restaurantId).then((result) => {
      expect(result).toEqual(mockIndirizzo);
    });
  });

  it('should throw error if no address found', () => {
    const restaurantId = 2;
    const mockResponse: ResultAddress<Indirizzo[]> = {
      result: true,
      message: '',
      data: [],
    };

    axiosGetSpy.and.returnValue(Promise.resolve({ data: mockResponse })); // Simula la chiamata axios.get

    service.getAddressByRestaurantId(restaurantId).catch((error) => {
      expect(error.message).toEqual('');
    });
  });

  it('should throw error if axios request fails', () => {
    const restaurantId = 3;
    const errorMessage = 'Axios request failed';

    axiosGetSpy.and.returnValue(Promise.reject(new Error(errorMessage))); // Simula un errore nella chiamata axios.get

    service.getAddressByRestaurantId(restaurantId).catch((error) => {
      expect(error.message).toEqual(errorMessage);
    });
  });
});
