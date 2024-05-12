import { TestBed } from '@angular/core/testing';
import { IngredientiService } from './ingredienti.service';
import axios from '../../../../axios-config';
import { Ingredient } from '../../interfaces/ingredienti';

describe('IngredientiService', () => {
  let service: IngredientiService;
  let axiosGetSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientiService);
    axiosGetSpy = spyOn(axios, 'get');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /**write tests to cover the getIngredientsById() function and all the branches inside */
  it('getIngredientsById should return an array of ingredients', async () => {
    const ingredientIds = [1, 2, 3];
    const ingredient1: Ingredient = {
      id: 1,
      id_restaurant: 1,
      name: 'ingredient1',
      unity_of_measurement: 'kg',
    };
    const ingredient2: Ingredient = {
      id: 2,
      id_restaurant: 1,
      name: 'ingredient2',
      unity_of_measurement: 'kg',
    };
    const ingredient3: Ingredient = {
      id: 3,
      id_restaurant: 1,
      name: 'ingredient3',
      unity_of_measurement: 'kg',
    };
    axiosGetSpy.and.returnValues(
      Promise.resolve({ data: { data: [ingredient1] } }),
      Promise.resolve({ data: { data: [ingredient2] } }),
      Promise.resolve({ data: { data: [ingredient3] } }),
    );

    const result = await service.getIngredientsById(ingredientIds);
    expect(result).toEqual([ingredient1, ingredient2, ingredient3]);
  });

  it('getIngredientsById should return an empty array if no ingredients are found', async () => {
    const ingredientIds = [1, 2, 3];
    axiosGetSpy.and.returnValues(
      Promise.resolve({ data: { data: [] } }),
      Promise.resolve({ data: { data: [] } }),
      Promise.resolve({ data: { data: [] } }),
    );

    const result = await service.getIngredientsById(ingredientIds);
    expect(result).toEqual([]);
  });

  it('getIngredientsById should throw an error if the request fails', async () => {
    const ingredientIds = [1, 2, 3];
    axiosGetSpy.and.returnValues(
      Promise.reject('error'),
      Promise.reject('error'),
      Promise.reject('error'),
    );

    await expectAsync(service.getIngredientsById(ingredientIds)).toBeRejected();
  });

  it('getIngredientsByDishId should return an array of ingredient ids', async () => {
    const dishId = 1;
    axiosGetSpy.and.returnValue(
      Promise.resolve({
        data: {
          data: [
            { id_ingredient: 1 },
            { id_ingredient: 2 },
            { id_ingredient: 3 },
          ],
        },
      }),
    );

    const result = await service.getIngredientsByDishId(dishId);
    expect(result).toEqual([1, 2, 3]);
  });

  it('getIngredientsByDishId should return an empty array if no ingredients are found', async () => {
    const dishId = 1;
    axiosGetSpy.and.returnValue(Promise.resolve({ data: { data: [] } }));

    const result = await service.getIngredientsByDishId(dishId);
    expect(result).toEqual([]);
  });

  it('getIngredientsByDishId should throw an error if the request fails', async () => {
    const dishId = 1;
    axiosGetSpy.and.returnValue(Promise.reject('error'));

    await expectAsync(service.getIngredientsByDishId(dishId)).toBeRejected();
  });
});
