import { Test, TestingModule } from '@nestjs/testing';
import { AllergiesIngredientsController } from './allergies-ingredients.controller';
import { AllergiesIngredientsService } from './allergies-ingredients.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { JwtService } from '@nestjs/jwt';
import { CreateAllergiesIngredientDto } from './dto/create-allergies-ingredient.dto';
import { ResultAllergiesIngredientDto } from './dto/result-allergies-ingredient.dto';

jest.mock('../database/database.service');
jest.mock('./allergies-ingredients.service');
jest.mock('../authentication/authentication.service');
jest.mock('../authorization/authorization.service');

describe('AllergiesIngredientsController', () => {
  let controller: AllergiesIngredientsController;
  let service: AllergiesIngredientsService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllergiesIngredientsController],
      providers: [AllergiesIngredientsService, AuthorizationService, JwtService],
    }).compile();
    controller = module.get<AllergiesIngredientsController>(AllergiesIngredientsController);
    service = module.get<AllergiesIngredientsService>(AllergiesIngredientsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create', () => {

    it('should create and return a response with status 200', async () => {
      const createAllergyDto: CreateAllergiesIngredientDto = {
        id_allergy: 1,
        id_ingredient: 1
      };
      const expectedResult: ResultAllergiesIngredientDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_allergy: 1,
            id_ingredient: 1
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.create(createAllergyDto, req);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createAllergyDto);
    });
  });


  describe('findAllByAllergyId', () => {

    it('should return data with status 200 for the given allergy ID', async () => {
      const mockId = '1';
      const mockResult: ResultAllergiesIngredientDto = {
        result: true,
        message: 'Mocked allergies found',
        data: [
          {
            id_allergy: 1,
            id_ingredient: 1
          }
        ]
      };
      jest.spyOn(service, 'findAllByAllergyId').mockResolvedValueOnce(mockResult);
      const result = await controller.findAllByAllergyId(mockId);
      expect(result).toEqual(mockResult);
      expect(service.findAllByAllergyId).toHaveBeenCalledWith(parseInt(mockId));
    });
  });


  describe('findAllByIngredientId', () => {

    it('should return data with status 200 for the given allergy ID', async () => {
      const mockId = '1';
      const mockResult: ResultAllergiesIngredientDto = {
        result: true,
        message: 'Mocked allergies found',
        data: [
          {
            id_allergy: 1,
            id_ingredient: 1
          }
        ]
      };
      jest.spyOn(service, 'findAllByIngredientId').mockResolvedValueOnce(mockResult);
      const result = await controller.findAllByIngredientId(mockId);
      expect(result).toEqual(mockResult);
      expect(service.findAllByIngredientId).toHaveBeenCalledWith(parseInt(mockId));
    });
  });


  describe('findOne', () => {

    it('should return a response with status 200', async () => {
      const idAllergy = '1';
      const idIngredient = '1';
      const expectedResult: ResultAllergiesIngredientDto = {
        result: true,
        message: 'Successfully found',
        data: [
          {
            id_allergy: 1,
            id_ingredient: 1
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      const result = await controller.findOne(idAllergy, idIngredient, req);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(parseInt(idAllergy), parseInt(idIngredient));
    });
  });


  describe('remove', () => {
    
    it('should remove and return a response with status 200', async () => {
      const idAllergy = '1';
      const idIngredient = '1';
      const expectedResult: ResultAllergiesIngredientDto = {
        result: true,
        message: 'Successfully deleted',
        data: [
          {
            id_allergy: 1,
            id_ingredient: 1
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.remove(idAllergy, idIngredient, req);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(parseInt(idAllergy), parseInt(idIngredient));
    });
  });

});
