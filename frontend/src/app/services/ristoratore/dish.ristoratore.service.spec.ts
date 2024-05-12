import { TestBed } from '@angular/core/testing';
import axios from '../../../../axios-config';
import MockAdapter from 'axios-mock-adapter';
import { DishRistoratoreService } from './dish.ristoratore.service';
import { MessageService } from '../lib/message.service';
import { Dish, DishCreate } from '../../interfaces/dish';

describe('DishRistoratoreService', () => {
  let service: DishRistoratoreService;
  let mockAxios: MockAdapter;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    mockMessageService = jasmine.createSpyObj('MessageService', [
      'log',
      'error',
    ]);

    TestBed.configureTestingModule({
      providers: [
        DishRistoratoreService,
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    service = TestBed.inject(DishRistoratoreService);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should create a new dish and log a message', async () => {
    const newDish = {
      name: 'Pizza',
      description: 'Delicious pizza',
      price: '10',
    } as DishCreate;
    const responseData = {
      result: true,
      data: [newDish],
      message: 'Dish created successfully',
    };

    mockAxios.onPost('dishes/create').reply(200, responseData);

    const result = await service.create(newDish);

    expect(result.name).toEqual(newDish.name);
    expect(result.description).toEqual(newDish.description);
    expect(result.price as any as string).toEqual(newDish.price);
    expect(mockMessageService.log).toHaveBeenCalledWith(
      'Dish created successfully',
    );
  });

  it('should handle creation error and log an error message', async () => {
    mockAxios.onPost('dishes/create').reply(200, { result: false });

    await service.create({
      name: 'Pizza',
      description: '',
      price: '10',
    } as DishCreate);
    expect(mockMessageService.error).toHaveBeenCalled();
  });

  it('should get a dish by ID', async () => {
    const dishId = 1;
    const dishData = {
      id: dishId,
      name: 'Salad',
      description: 'Fresh salad',
      price: 5,
      id_restaurant: 1,
      image: 'hello',
    };
    mockAxios
      .onGet(`dishes/find-one/${dishId}`)
      .reply(200, { result: true, data: [dishData] });

    const result = await service.get(dishId);

    expect(result).toEqual(dishData);
  });

  it('should handle get error and log an error message', async () => {
    mockAxios.onGet('dishes/find-one/1').reply(200, { result: false });

    await service.get(1);
    expect(mockMessageService.error).toHaveBeenCalledWith(
      'Failed to get the dish',
    );
  });

  it('should update a dish and return true', async () => {
    const dish: Dish = {
      id: 1,
      name: 'Burger',
      description: 'Juicy burger',
      price: 15,
    } as Dish;
    mockAxios.onPatch(`dishes/${dish.id}`).reply(200, { result: true });

    const result = await service.update(dish);

    expect(result).toBeTrue();
    expect(mockMessageService.log).toHaveBeenCalledWith(
      'Dish updated successfully',
    );
  });

  it('should handle the failure of the update of a dish', async () => {
    const dish: Dish = {
      id: 1,
      name: 'Burger',
      description: 'Juicy burger',
      price: 15,
    } as Dish;
    mockAxios.onPatch(`dishes/${dish.id}`).reply(200, { result: false });

    const result = await service.update(dish);

    expect(result).toBeFalse();
    expect(mockMessageService.error).toHaveBeenCalledWith(
      'Failed to update the dish',
    );
  });

  it('should delete a dish and return true', async () => {
    const dishId = 1;
    mockAxios
      .onDelete(`dishes/${dishId}`)
      .reply(200, { result: true, message: 'Dish deleted successfully' });

    const result = await service.delete(dishId);

    expect(result).toBeTrue();
    expect(mockMessageService.log).toHaveBeenCalledWith(
      'Dish deleted successfully',
    );
  });

  it('should handle the failure of the delete of a dish', async () => {
    mockAxios.onDelete('dishes/1').reply(200, { result: false });

    const result = await service.delete(1);

    expect(result).toBeFalse();
    expect(mockMessageService.error).toHaveBeenCalledWith(
      'Failed to delete the dish',
    );
  });
});
