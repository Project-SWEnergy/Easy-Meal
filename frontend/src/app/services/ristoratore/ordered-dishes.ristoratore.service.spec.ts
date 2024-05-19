import { TestBed } from '@angular/core/testing';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../../axios-config';

import { OrderedDishesRistoratoreService } from './ordered-dishes.ristoratore.service';
import { DishIngredientRistoratoreService } from './dish-ingredient.ristoratore.service';
import { MessageService } from '../lib/message.service';
import { OrderedDishes } from '../../interfaces/ordered-dishes';
import { DishIngredient } from '../../interfaces/ingredient';
import { AuthService } from '../auth.service';

describe('OrderedDishesRistoratoreService', () => {
  let service: OrderedDishesRistoratoreService;
  let mockDishIngredientService: jasmine.SpyObj<DishIngredientRistoratoreService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['get']);
    mockAuthService.get.and.returnValue({ id: 123, role: 'restaurant' }); // Assuming a restaurant ID is always returned

    mockDishIngredientService = jasmine.createSpyObj(
      'DishIngredientRistoratoreService',
      ['ingredients_in_dish'],
    );
    mockMessageService = jasmine.createSpyObj('MessageService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        OrderedDishesRistoratoreService,
        {
          provide: DishIngredientRistoratoreService,
          useValue: mockDishIngredientService,
        },
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    service = TestBed.inject(OrderedDishesRistoratoreService);
    mockAxios = new MockAdapter(axios);
  });

  describe('get_ordered_dishes', () => {
    it('should return an array of ordered dishes if the response is successful', async () => {
      const mockDishes = [
        { id: 1, id_user: 2, id_dish: 3, removed_ingredients: [] },
      ] as any as OrderedDishes[];
      mockAxios
        .onGet('ordered-dishes/find-all-by-reservation/1')
        .reply(200, { result: true, data: mockDishes });
      const result = await service.get_ordered_dishes(1);
      expect(result).toEqual(mockDishes);
    });

    it('should handle errors and log a message if no orders are found', async () => {
      mockAxios
        .onGet('ordered-dishes/find-all-by-reservation/1')
        .reply(200, {});
      await service.get_ordered_dishes(1);
      expect(mockMessageService.error).toHaveBeenCalledWith('Errore nel recupero dei piatti ordinati');
    });
  });

  describe('get_ingredients_by_order', () => {
    it('should return filtered ingredients for an order', async () => {
      const order = {
        id_dish: 1,
        removed_ingredients: [{ id_ingredient: 2 } as any as OrderedDishes],
      };
      const ingredients = [
        { id_ingredient: 1 },
        { id_ingredient: 2 },
        { id_ingredient: 3 },
      ] as DishIngredient[];
      mockDishIngredientService.ingredients_in_dish.and.returnValue(
        Promise.resolve(ingredients),
      );
      const result = await service.get_ingredients_by_order(
        order as any as OrderedDishes,
      );
      expect(result).toEqual([
        { id_ingredient: 1 } as any as DishIngredient,
        { id_ingredient: 3 } as any as DishIngredient,
      ]);
    });
  });

  describe('get_orders_grouped_by_user', () => {
    it('should group orders by user', () => {
      const orders = [
        { id_user: 1, id_dish: 2 } as OrderedDishes,
        { id_user: 1, id_dish: 3 } as OrderedDishes,
        { id_user: 2, id_dish: 4 } as OrderedDishes,
      ];
      const grouped = service.get_orders_grouped_by_user(orders);
      expect(grouped.length).toBe(2);
      expect(grouped[0].length).toBe(2);
      expect(grouped[1].length).toBe(1);
    });
  });

  describe('get_orders_price', () => {
    it('should calculate the total price of the orders', () => {
      const orders = [
        { price_dish: 10.0 },
        { price_dish: 20.5 },
        { price_dish: 9.99 },
      ] as OrderedDishes[];
      const total = service.get_orders_price(orders);
      expect(total).toBe('40.49');
    });
  });
});
