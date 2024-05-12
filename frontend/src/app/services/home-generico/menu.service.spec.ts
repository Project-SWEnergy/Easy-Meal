import { TestBed } from '@angular/core/testing';
import { MenuService } from './menu.service';
import axios from '../../../../axios-config';
import { Dish } from '../../interfaces/dish';

describe('MenuService', () => {
  let service: MenuService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuService);
    axiosGetSpy = spyOn(axios, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return menu items if response contains data', () => {
    const dishes: Dish[] = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'dish1',
        description: 'description1',
        price: 10,
        image: 'image1',
      },
      {
        id: 2,
        id_restaurant: 1,
        name: 'dish2',
        description: 'description2',
        price: 20,
        image: 'image2',
      },
    ];

    axiosGetSpy.and.returnValue(Promise.resolve({ data: { data: dishes } }));

    service.getMenuByRestaurantId(1).then((menu) => {
      expect(menu).toEqual(dishes);
    });
  });

  it('should throw error if request fails', () => {
    const errorMessage = 'Test error message';

    axiosGetSpy.and.returnValue(Promise.reject(new Error(errorMessage)));

    service.getMenuByRestaurantId(1).catch((error) => {
      expect(error.message).toBe(errorMessage);
    });
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
