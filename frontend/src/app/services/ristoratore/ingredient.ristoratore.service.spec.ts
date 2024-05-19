import { TestBed } from '@angular/core/testing';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../../axios-config';

import { IngredientRistoratoreService } from './ingredient.ristoratore.service';
import { AuthService } from '../auth.service';
import { MessageService } from '../lib/message.service';
import { UnitOfMeasurement } from '../../interfaces/ingredient';

describe('IngredientRistoratoreService', () => {
  let service: IngredientRistoratoreService;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['get']);
    mockMessageService = jasmine.createSpyObj('MessageService', [
      'error',
      'log',
    ]);

    TestBed.configureTestingModule({
      providers: [
        IngredientRistoratoreService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: MessageService, useValue: mockMessageService },
      ],
    });

    // Set up the AuthService mock to provide the necessary restaurant ID
    mockAuthService.get.and.returnValue({ id: 123, role: 'restaurant' }); // Assuming a restaurant ID is always returned
    service = TestBed.inject(IngredientRistoratoreService);
    mockAxios = new MockAdapter(axios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    const newIngredient = {
      name: 'Tomato',
      unit_of_measurement: UnitOfMeasurement.g,
    };
    const responseIngredient = { ...newIngredient, id: 1, id_restaurant: 123 };

    it('should successfully create an ingredient', async () => {
      mockAxios.onPost('ingredients/create').reply(200, {
        result: true,
        data: [responseIngredient],
        message: 'Ingredient created successfully',
      });
      const result = await service.create(newIngredient);
      expect(result).toEqual(responseIngredient);
      expect(mockMessageService.log).toHaveBeenCalledWith(
        'Ingrediente creato con successo'
      );
    });

    it('should handle creation errors', async () => {
      mockAxios.onPost('ingredients/create').reply(200, { result: false });
      await service.create(newIngredient);
      expect(mockMessageService.error).toHaveBeenCalledWith('Errore nella creazione dell\'ingrediente');
    });
  });

  describe('get_one', () => {
    const ingredient = {
      id: 1,
      name: 'Tomato',
      id_restaurant: 123,
      unit_of_measurement: UnitOfMeasurement.g,
    };

    it('should retrieve a single ingredient', async () => {
      mockAxios
        .onGet('ingredients/find-one/1')
        .reply(200, { result: true, data: [ingredient] });
      const result = await service.get_one(1);
      expect(result).toEqual(ingredient);
    });

    it('should handle errors when retrieving a single ingredient', async () => {
      mockAxios.onGet('ingredients/find-one/1').reply(200, { result: false });
      await service.get_one(1);
      expect(mockMessageService.error).toHaveBeenCalledWith(
        'Ingrediente non trovato'
      );
    });
  });

  describe('get_all', () => {
    const ingredients = [
      {
        id: 1,
        name: 'Tomato',
        id_restaurant: 123,
        unit_of_measurement: UnitOfMeasurement.g,
      },
      {
        id: 2,
        name: 'Basil',
        id_restaurant: 123,
        unit_of_measurement: UnitOfMeasurement.g,
      },
    ];

    it('should retrieve all ingredients for the restaurant', async () => {
      mockAxios
        .onGet('ingredients/find-all-by-restaurant')
        .reply(200, { result: true, data: ingredients });
      const result = await service.get_all();
      expect(result).toEqual(ingredients);
    });

    it('should handle errors when retrieving all ingredients', async () => {
      mockAxios
        .onGet('ingredients/find-all-by-restaurant')
        .reply(200, { result: false });
      await service.get_all();
      expect(mockMessageService.error).toHaveBeenCalledWith(
        'Errore nel recupero degli ingredienti'
      );
    });
  });

  describe('update', () => {
    const ingredient = {
      id: 1,
      name: 'Tomato',
      id_restaurant: 123,
      unit_of_measurement: UnitOfMeasurement.g,
    };

    it('should update an ingredient successfully', async () => {
      mockAxios.onPatch('ingredients/1').reply(200, {
        result: true,
        message: 'Ingredient updated successfully',
      });
      const result = await service.update(1, ingredient);
      expect(result).toBeTrue();
      expect(mockMessageService.log).toHaveBeenCalledWith(
        'Ingrediente aggiornato con successo'
      );
    });

    it('should handle update errors', async () => {
      mockAxios.onPatch('ingredients/1').reply(200, { result: false });
      const result = await service.update(1, ingredient);
      expect(result).toBeFalse();
      expect(mockMessageService.error).toHaveBeenCalledWith(
        'Errore nell\'aggiornamento dell\'ingrediente'
      );
    });
  });

  describe('delete', () => {
    it('should delete an ingredient successfully', async () => {
      mockAxios.onDelete('ingredients/1').reply(200, {
        result: true,
        message: 'Ingredient deleted successfully',
      });
      const result = await service.delete(1);
      expect(result).toBeTrue();
      expect(mockMessageService.log).toHaveBeenCalledWith(
        'Ingrediente eliminato con successo'
      );
    });

    it('should handle deletion errors', async () => {
      mockAxios.onDelete('ingredients/1').reply(200, { result: false });
      const result = await service.delete(1);
      expect(result).toBeFalse();
      expect(mockMessageService.error).toHaveBeenCalledWith(
        'Errore nell\'eliminazione dell\'ingrediente'
      );
    });
  });
});
