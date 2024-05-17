import { TestBed } from '@angular/core/testing';
import axios from '../../../../axios-config';
import { RistorantiService } from './ristoranti.service';

describe('RistorantiService', () => {
  let service: RistorantiService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RistorantiService);
    axiosGetSpy = spyOn(axios, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllRestaurants', () => {
    service.getAllRestaurants().then((restaurants) => {
      expect(restaurants).toBeTruthy();
    });
    expect(axios.get).toHaveBeenCalledWith('restaurants/find-all');
  });

  it('should return restaurants if response contains data', () => {
    const mockRestaurants = [
      {
        id: 1,
        email: 'restaurant1@example.com',
        name: 'Restaurant 1',
        owner_name: 'Owner 1',
        owner_surname: 'OwnerSurname 1',
        id_address: 1,
        seats: 50,
        website: 'https://www.restaurant1.com',
        price_tier: 2,
        description: 'Description of Restaurant 1',
        phone: '123-456-789',
        childrenn_seats: 10,
        accessibility: true,
        logo: 'logo1.jpg',
        banner_image: 'banner1.jpg',
      },
      {
        id: 2,
        email: 'restaurant2@example.com',
        name: 'Restaurant 2',
        owner_name: 'Owner 2',
        owner_surname: 'OwnerSurname 2',
        id_address: 2,
        seats: 30,
        website: 'https://www.restaurant2.com',
        price_tier: 3,
        description: 'Description of Restaurant 2',
        phone: '987-654-321',
        childrenn_seats: 5,
        accessibility: false,
        logo: 'logo2.jpg',
        banner_image: 'banner2.jpg',
      },
    ];

    axiosGetSpy.and.returnValue(
      Promise.resolve({ data: { result: true, data: mockRestaurants } }),
    );

    service.getAllRestaurants().then((restaurants) => {
      expect(restaurants).toEqual(mockRestaurants);
    });
  });

  it('should throw error if request fails', () => {
    const errorMessage = 'Test error message';

    axiosGetSpy.and.returnValue(Promise.reject(new Error(errorMessage)));

    service.getAllRestaurants().catch((error) => {
      expect(error.message).toBe(errorMessage);
    });
  });

  it('should call getAllRestaurants and return restaurant by ID', async () => {
    const mockRestaurants = [
      {
        id: 1,
        email: 'restaurant1@example.com',
        name: 'Restaurant 1',
        owner_name: 'Owner 1',
        owner_surname: 'OwnerSurname 1',
        id_address: 1,
        seats: 50,
        website: 'https://www.restaurant1.com',
        price_tier: 2,
        description: 'Description of Restaurant 1',
        phone: '123-456-789',
        childrenn_seats: 10,
        accessibility: true,
        logo: 'logo1.jpg',
        banner_image: 'banner1.jpg',
      },
      {
        id: 2,
        email: 'restaurant2@example.com',
        name: 'Restaurant 2',
        owner_name: 'Owner 2',
        owner_surname: 'OwnerSurname 2',
        id_address: 2,
        seats: 30,
        website: 'https://www.restaurant2.com',
        price_tier: 3,
        description: 'Description of Restaurant 2',
        phone: '987-654-321',
        childrenn_seats: 5,
        accessibility: false,
        logo: 'logo2.jpg',
        banner_image: 'banner2.jpg',
      },
    ];

    axiosGetSpy.and.returnValue(
      Promise.resolve({ data: { result: true, data: mockRestaurants } }),
    );

    const restaurant = await service.getRestaurantById(1);

    expect(axios.get).toHaveBeenCalledWith('restaurants/find-all');
    expect(restaurant).toEqual(mockRestaurants[0]);
  });

  it('should throw error if request fails in getRestaurantById', async () => {
    const errorMessage = 'Test error message';

    axiosGetSpy.and.returnValue(Promise.reject(new Error(errorMessage)));

    service.getRestaurantById(1).catch((error) => {
      expect(error.message).toBe(errorMessage);
    });
  });

  /**write test to check the else branch where is throw the error inside the getAllRestaurants() function */
  it('should throw error if request fails in getAllRestaurants', async () => {
    const errorMessage = 'Test error message';

    axiosGetSpy.and.returnValue(
      Promise.resolve({ data: { result: false, message: errorMessage } }),
    );

    service.getAllRestaurants().catch((error) => {
      expect(error.message).toBe(errorMessage);
    });
  });
});
