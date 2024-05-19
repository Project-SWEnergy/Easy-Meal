import { TestBed } from '@angular/core/testing';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../../axios-config';
import { DishesRistoratoreService } from './dishes.ristoratore.service';
import { AuthService } from '../auth.service';
import { MessageService } from '../lib/message.service';
import { toDish } from '../../interfaces/dish';

describe('DishesRistoratoreService', () => {
  let service: DishesRistoratoreService;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['get']);
    mockMessageService = jasmine.createSpyObj('MessageService', ['error']);

    TestBed.configureTestingModule({
      providers: [
        DishesRistoratoreService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    mockAuthService.get.and.returnValue({ id: 123, role: 'restaurant' });
    service = TestBed.inject(DishesRistoratoreService);
    mockAxios = new MockAdapter(axios);
  });

  describe('constructor', () => {
    it('should set user id', () => {
      expect(service.id).toEqual(123);
    });
  });

  describe('get', () => {
    const dummyDishes = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Pizza Margherita',
        description: 'description',
        price: '5',
        image: 'pic',
      },
    ];

    it('should return a list of dishes on successful fetch', async () => {
      mockAxios
        .onGet('dishes/find-all/123')
        .reply(200, { result: true, data: dummyDishes });
      const dishes = await service.get();
      expect(dishes).toEqual(dummyDishes.map(toDish));
    });

    it('should handle backend errors', async () => {
      const errorMessage = 'Backend error';
      mockAxios
        .onGet(`dishes/find-all/123`)
        .reply(500, { message: errorMessage });
      await service.get();
      expect(mockMessageService.error).toHaveBeenCalledWith(
        'Errore nel recupero dei piatti'
      );
    });

    it('should throw if backend returns no message', async () => {
      mockAxios.onGet(`dishes/find-all/123`).reply(200, { result: false });
      await service.get();
      expect(mockMessageService.error).toHaveBeenCalledWith(
        'Errore nel recupero dei piatti'
      );
    });
  });
});
