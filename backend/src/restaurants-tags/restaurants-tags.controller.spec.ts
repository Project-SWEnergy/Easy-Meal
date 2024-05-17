import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsTagsController } from './restaurants-tags.controller';
import { RestaurantsTagsService } from './restaurants-tags.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { desc } from 'drizzle-orm';
import { CreateRestaurantsTagDto } from './dto/create-restaurants-tag.dto';
import { ResultRestaurantsTagsDto } from './dto/result-restaurants-tags.dto';
import { RestaurantsTag } from './entities/restaurants-tag.entity';

jest.mock('../database/database.service');

describe('RestaurantsTagsController', () => {
  let controller: RestaurantsTagsController;
  let service: RestaurantsTagsService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsTagsController],
      providers: [RestaurantsTagsService, AuthorizationService, DatabaseService, JwtService],
    }).compile();

    controller = module.get<RestaurantsTagsController>(RestaurantsTagsController);
    service = module.get<RestaurantsTagsService>(RestaurantsTagsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call restaurantsTagsService.create', async () => {
      const createRestaurantsTagDto: CreateRestaurantsTagDto = {
        id_tags: [1]
      };
      const req = { cookies: { accessToken: 'test' } };
      const auth = { token: { id: 1 } };
      const result: ResultRestaurantsTagsDto = {
        result: true,
        message: 'test',
        data: [
          {
            id_tag: 1,
            name_tag: 'test',
            description_tag: 'test',
            id_restaurant: 1
          }
        ]
      };
      jest.spyOn(authorizationService as any, 'isAuthorized').mockReturnValue(auth);
      jest.spyOn(service, 'create').mockResolvedValue(result);
      const response = await controller.create(createRestaurantsTagDto, req as any);
      expect(response).toBe(result);
    });

  });

  describe('findAllByRestaurantId', () => {
    it('should call restaurantsTagsService.findAllByRestaurantId', async () => {
      const restaurantId = '1';
      const result: ResultRestaurantsTagsDto = {
        result: true,
        message: 'test',
        data: [
          {
            id_tag: 1,
            name_tag: 'test',
            description_tag: 'test',
            id_restaurant: 1
          }
        ]
      };
      jest.spyOn(service, 'findAllByRestaurantId').mockResolvedValue(result);
      const response = await controller.findAllByRestaurantId(restaurantId);
      expect(response).toBe(result);
    });

    it('should throw BadRequestException', async () => {
      const restaurantId = 'test';
      expect(controller.findAllByRestaurantId(restaurantId)).rejects.toThrow();
    });

  });

  describe('update', () => {
    it('should call restaurantsTagsService.update', async () => {
      const updateRestaurantsTagDto = {
        id_tags: [1]
      };
      const req = { cookies: { accessToken: 'test' } };
      const auth = { token: { id: 1 } };
      const result: ResultRestaurantsTagsDto = {
        result: true,
        message: 'test',
        data: [
          {
            id_tag: 1,
            name_tag: 'test',
            description_tag: 'test',
            id_restaurant: 1
          }
        ]
      };
      jest.spyOn(authorizationService as any, 'isAuthorized').mockReturnValue(auth);
      jest.spyOn(service, 'update').mockResolvedValue(result);
      const response = await controller.update(updateRestaurantsTagDto, req as any);
      expect(response).toBe(result);
    });

  });
});
