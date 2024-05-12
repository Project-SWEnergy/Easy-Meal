import { TestBed } from '@angular/core/testing';
import axios from '../../../../axios-config';
import { RecensioniService } from './recensioni.service';

describe('RecensioneService', () => {
  let service: RecensioniService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecensioniService);
    axiosGetSpy = spyOn(axios, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return recensioni if response contains data', () => {
    const restaurantId = 1;
    const mockRecensioni = [
      {
        id_restaurant: 1,
        name_restaurant: 'Restaurant 1',
        id_user: 1,
        name_user: 'User 1',
        date: '2024-05-10',
        score: 4,
        description: 'Great food!',
      },
      {
        id_restaurant: 1,
        name_restaurant: 'Restaurant 1',
        id_user: 2,
        name_user: 'User 2',
        date: '2024-05-09',
        score: 5,
        description: 'Excellent service!',
      },
    ];

    axiosGetSpy.and.returnValue(
      Promise.resolve({ data: { data: mockRecensioni } }),
    );

    service.getReviewByRestaurantId(restaurantId).then((recensioni: any) => {
      expect(recensioni).toEqual(mockRecensioni);
    });
  });

  it('should throw error if request fails', () => {
    const errorMessage = 'Test error message';

    axiosGetSpy.and.returnValue(Promise.reject(new Error(errorMessage)));

    service.getReviewByRestaurantId(1).catch((error: any) => {
      expect(error.message).toBe(errorMessage);
    });
  });
});
