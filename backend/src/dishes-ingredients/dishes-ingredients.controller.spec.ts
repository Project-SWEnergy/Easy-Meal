import { Test, TestingModule } from '@nestjs/testing';
import { DishesIngredientsController } from './dishes-ingredients.controller';
import { DishesIngredientsService } from './dishes-ingredients.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { DatabaseModule } from '../database/database.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { CreateDishesIngredientDto } from './dto/create-dishes-ingredient.dto';
import { ResultDishesIngredientDto } from './dto/result-dishes-ingredients.dto';
import { UnitsOfMeasurement } from '../ingredients/entities/ingredient.entity';
import { UpdateDishesIngredientDto } from './dto/update-dishes-ingredient.dto';

jest.mock('../database/database.service');
jest.mock('./dishes-ingredients.service');
jest.mock('../authentication/authentication.service');
jest.mock('../authorization/authorization.service');
jest.mock('../upload-file/upload-file.service');

describe('DishesIngredientsController', () => {
  let controller: DishesIngredientsController;
  let service: DishesIngredientsService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule,
      ],
      controllers: [DishesIngredientsController],
      providers: [DishesIngredientsService],
    }).compile();

    controller = module.get<DishesIngredientsController>(DishesIngredientsController);
    service = module.get<DishesIngredientsService>(DishesIngredientsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create', () => {

    it('should create and return a response with status 200', async () => {
      const createDto: CreateDishesIngredientDto[] =
        [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1,

          }
        ];
      const expectedResult: ResultDishesIngredientDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1,
            units_of_measurement: UnitsOfMeasurement.g
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.create(createDto, req);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });


  describe('findAllByIngredientId', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultDishesIngredientDto = {
        result: true,
        message: 'message',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1,
            units_of_measurement: UnitsOfMeasurement.g
          }
        ]
      };
      jest.spyOn(service, 'findAllByIngredientId').mockResolvedValue(expectedResult);
      const result = await controller.findAllByIngredientId(mockId);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByIngredientId).toHaveBeenCalledWith(parseInt(mockId));
    });
  });




  describe('findAllByDishId', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultDishesIngredientDto = {
        result: true,
        message: 'message',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1,
            units_of_measurement: UnitsOfMeasurement.g
          }
        ]
      };
      jest.spyOn(service, 'findAllByDishId').mockResolvedValue(expectedResult);
      const result = await controller.findAllByDishId(mockId);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByDishId).toHaveBeenCalledWith(parseInt(mockId));
    });
  });




  describe('findOne', () => {

    it('should search and return a response with status 200', async () => {
      const mockIdDish = "1";
      const mockIdIngredient = "1";
      const expectedResult: ResultDishesIngredientDto = {
        result: true,
        message: 'message',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1,
            units_of_measurement: UnitsOfMeasurement.g
          }
        ]
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      const result = await controller.findOne(mockIdDish, mockIdIngredient);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(parseInt(mockIdDish),parseInt(mockIdIngredient));
    });
  });



  describe('update', () => {

    it('should update and return a response with status 200', async () => {
      const mockIdDish = "1";
      const mockIdIngredient = "1";
      const updateDto: UpdateDishesIngredientDto = {
            quantity: 1,
      };
      const expectedResult: ResultDishesIngredientDto = {
        result: true,
        message: 'Successfully updated',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1,
            units_of_measurement: UnitsOfMeasurement.g
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.update(mockIdDish, mockIdIngredient, updateDto, req);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(parseInt(mockIdDish), parseInt(mockIdIngredient), updateDto);
    });
  });




  describe('remove', () => {

    it('should remove and return a response with status 200', async () => {
      const mockIdDish = "1";
      const mockIdIngredient = "1";
      const expectedResult: ResultDishesIngredientDto = {
        result: true,
        message: 'Successfully updated',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1,
            units_of_measurement: UnitsOfMeasurement.g
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.remove(mockIdDish, mockIdIngredient, req);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(parseInt(mockIdDish), parseInt(mockIdIngredient));
    });
  });

});
