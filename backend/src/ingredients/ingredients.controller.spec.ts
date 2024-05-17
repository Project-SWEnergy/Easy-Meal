import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsController } from './ingredients.controller';
import { IngredientsService } from './ingredients.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { DatabaseModule } from '../database/database.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { ResultIngredientDto } from './dto/result-ingredients.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';


jest.mock('../database/database.service');
jest.mock('./ingredients.service');
jest.mock('../authentication/authentication.service');
jest.mock('../authorization/authorization.service');

describe('IngredientsController', () => {
  let controller: IngredientsController;
  let service: IngredientsService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule,
      ],
      controllers: [IngredientsController],
      providers: [IngredientsService],
    }).compile();

    controller = module.get<IngredientsController>(IngredientsController);
    service = module.get<IngredientsService>(IngredientsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });



  describe('create', () => {

    it('should create and return a response with status 200', async () => {
      const createDto: CreateIngredientDto =
      {
        id_restaurant: 1,
        name: "TEST_ingredient",
        unit_of_measurement: "g"
      };
      const expectedResult: ResultIngredientDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "TEST_ingredient",
            unit_of_measurement: "g"
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




  describe('findAllByRestaurantId', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultIngredientDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "TEST_ingredient",
            unit_of_measurement: "g"
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'findAllByRestaurantId').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.findAllByRestaurantId(req);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByRestaurantId).toHaveBeenCalledWith(parseInt(mockId));
    });
  });




  describe('findOneByIngredientId', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultIngredientDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "TEST_ingredient",
            unit_of_measurement: "g"
          }
        ]
      };
      jest.spyOn(service, 'findOneByIngredientId').mockResolvedValue(expectedResult);
      const result = await controller.findOneByIngredientId(mockId);
      expect(result).toEqual(expectedResult);
      expect(service.findOneByIngredientId).toHaveBeenCalledWith(parseInt(mockId));
    });
  });




  describe('update', () => {

    it('should update and return a response with status 200', async () => {
      const mockId = "1";
      const updateDto: UpdateIngredientDto = {
        name: "Updated Name",
        unit_of_measurement: "g"
      };
      const expectedResult: ResultIngredientDto = {
        result: true,
        message: 'Successfully updated',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "TEST_ingredient",
            unit_of_measurement: "g"
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.update(mockId, updateDto, req);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(parseInt(mockId), updateDto);
    });
  });




  describe('remove', () => {

    it('should remove and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultIngredientDto = {
        result: true,
        message: 'Successfully updated',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "TEST_ingredient",
            unit_of_measurement: "g"
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.remove(mockId, req);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(parseInt(mockId));
    });
  });

});
