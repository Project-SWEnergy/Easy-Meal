import { TestBed } from '@angular/core/testing';
import { DishIngredientRistoratoreService } from './dish-ingredient.ristoratore.service';
import { IngredientRistoratoreService } from './ingredient.ristoratore.service';
import { MessageService } from '../lib/message.service';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../../axios-config';
import { UnitOfMeasurement } from '../../interfaces/ingredient';

describe('DishIngredientRistoratoreService', () => {
  let service: DishIngredientRistoratoreService;
  let mockAxios: MockAdapter;
  let ingredientService: jasmine.SpyObj<IngredientRistoratoreService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    ingredientService = jasmine.createSpyObj('IngredientRistoratoreService', [
      'get_all',
    ]);
    messageService = jasmine.createSpyObj('MessageService', ['error', 'log']);

    TestBed.configureTestingModule({
      providers: [
        DishIngredientRistoratoreService,
        { provide: IngredientRistoratoreService, useValue: ingredientService },
        { provide: MessageService, useValue: messageService },
      ],
    });
    service = TestBed.inject(DishIngredientRistoratoreService);
    mockAxios = new MockAdapter(axios);
  });

  it('should load all ingredients and return true on success', async () => {
    const ingredients = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Tomato',
        unit_of_measurement: UnitOfMeasurement.g,
      },
    ];
    ingredientService.get_all.and.returnValue(Promise.resolve(ingredients));

    expect(await service['get_all_ingredients']()).toBeTrue();
    expect(service['ingredients']).toEqual(ingredients);
  });

  it('should handle error on the failure of get_all', async () => {
    await ingredientService.get_all.and.returnValue(
      Promise.reject('Failed to fetch'),
    );

    expect(await service['get_all_ingredients']()).toBeFalse();
    expect(messageService.error).toHaveBeenCalledWith(
      "Failed to fetch restaurant's ingredients",
    );
  });

  it('should retrieve ingredients for a specific dish and return them', async () => {
    const dishId = 1;
    const dishIngredients = [
      { id_ingredient: 1, id_dish: dishId, quantity: 2 },
    ];
    mockAxios
      .onGet(`dishes-ingredients/find-all-by-dish/${dishId}`)
      .reply(200, { result: true, data: dishIngredients });

    const result = await service.ingredients_in_dish(dishId);
    expect(result).toEqual(dishIngredients);
  });

  it('should handle errors when fetching ingredients for a dish', async () => {
    const dishId = 1;
    mockAxios
      .onGet(`dishes-ingredients/find-all-by-dish/${dishId}`)
      .reply(200, { result: false });

    await service.ingredients_in_dish(dishId);
    expect(messageService.error).toHaveBeenCalledWith(
      'Failed to fetch ingredients in dish',
    );
  });

  it('should filter out existing ingredients from the list for a dish', async () => {
    const dishId = 1;
    service.ingredients = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Tomato',
        unit_of_measurement: UnitOfMeasurement.g,
      },
      {
        id: 2,
        id_restaurant: 1,
        name: 'Tomato',
        unit_of_measurement: UnitOfMeasurement.g,
      },
      {
        id: 3,
        id_restaurant: 1,
        name: 'Tomato',
        unit_of_measurement: UnitOfMeasurement.g,
      },
    ];
    spyOn(service, 'ingredients_in_dish').and.returnValue(
      Promise.resolve([
        { id_ingredient: 1, id_dish: 1, quantity: 3 },
        { id_ingredient: 2, id_dish: 1, quantity: 3 },
      ]),
    );

    const result = await service['take_off_existing'](dishId);
    expect(result).toBeTrue();
    expect(service.ingredients).toEqual([
      {
        id: 3,
        id_restaurant: 1,
        name: 'Tomato',
        unit_of_measurement: UnitOfMeasurement.g,
      },
    ]);
  });

  it('should create a dish ingredient and return true on success', async () => {
    const dishIngredient = { id_dish: 1, id_ingredient: 1, quantity: 2 };
    mockAxios
      .onPost('dishes-ingredients/create')
      .reply(200, { data: dishIngredient, result: true });

    const ingredients = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Tomato',
        unit_of_measurement: UnitOfMeasurement.g,
      },
    ];
    ingredientService.get_all.and.returnValue(Promise.resolve(ingredients));

    mockAxios
      .onGet(`dishes-ingredients/find-all-by-dish/${dishIngredient.id_dish}`)
      .reply(200, { result: true, data: [] });

    const result = await service.create(dishIngredient);
    expect(result).toBeTrue();
  });

  it('should handle failure on create a dish ingredient', async () => {
    const dishIngredient = { id_dish: 1, id_ingredient: 1, quantity: 2 };
    mockAxios.onPost('dishes-ingredients/create').reply(200, { result: false });

    const ingredients = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Tomato',
        unit_of_measurement: UnitOfMeasurement.g,
      },
    ];

    const result = await service.create(dishIngredient);
    expect(result).toBeFalse();
    expect(messageService.error).toHaveBeenCalledWith(
      'Failed to create a binding between a dish and an ingredient',
    );
  });

  it('should update a dish ingredient and return true on success', async () => {
    const dishIngredient = { id_dish: 1, id_ingredient: 1, quantity: 3 };
    mockAxios
      .onPatch(
        `dishes-ingredients/${dishIngredient.id_dish}/${dishIngredient.id_ingredient}`,
      )
      .reply(200, { result: true });

    const result = await service.update(dishIngredient);
    expect(result).toBeTrue();
    expect(messageService.log).toHaveBeenCalledWith(
      'Binding between dish and ingredient updated',
    );
  });

  it('should faild to update a dish ingredient', async () => {
    const dishIngredient = { id_dish: 1, id_ingredient: 1, quantity: 3 };
    mockAxios
      .onPatch(
        `dishes-ingredients/${dishIngredient.id_dish}/${dishIngredient.id_ingredient}`,
      )
      .reply(200, { result: false });

    const result = await service.update(dishIngredient);
    expect(result).toBeFalse();
    expect(messageService.error).toHaveBeenCalledWith(
      'Failed to update a binding between a dish and an ingredient',
    );
  });

  it('should delete a dish ingredient and return true on success', async () => {
    const dishIngredient = { id_dish: 1, id_ingredient: 1, quantity: 3 };
    mockAxios
      .onDelete(
        `dishes-ingredients/${dishIngredient.id_dish}/${dishIngredient.id_ingredient}`,
      )
      .reply(200, { result: true });

    const ingredients = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Tomato',
        unit_of_measurement: UnitOfMeasurement.g,
      },
    ];
    ingredientService.get_all.and.returnValue(Promise.resolve(ingredients));

    mockAxios
      .onGet(`dishes-ingredients/find-all-by-dish/${dishIngredient.id_dish}`)
      .reply(200, { result: true, data: [] });

    const result = await service.delete(dishIngredient);
    expect(result).toBeTrue();
    expect(messageService.log).toHaveBeenCalledWith(
      'Binding between dish and ingredient deleted',
    );
  });

  it("should handle the failure of a dish ingredient's delete", async () => {
    const dishIngredient = { id_dish: 1, id_ingredient: 1, quantity: 3 };
    mockAxios
      .onDelete(
        `dishes-ingredients/${dishIngredient.id_dish}/${dishIngredient.id_ingredient}`,
      )
      .reply(200, { result: false });

    const ingredients = [
      {
        id: 1,
        id_restaurant: 1,
        name: 'Tomato',
        unit_of_measurement: UnitOfMeasurement.g,
      },
    ];

    const result = await service.delete(dishIngredient);
    expect(result).toBeFalse();
    expect(messageService.error).toHaveBeenCalledWith(
      'Failed to delete a binding between a dish and an ingredient',
    );
  });
});
