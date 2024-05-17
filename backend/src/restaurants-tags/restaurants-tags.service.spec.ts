import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsTagsService } from './restaurants-tags.service';
import { DatabaseService } from '../database/database.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

jest.mock('../database/database.service');

describe('RestaurantsTagsService', () => {
  let service: RestaurantsTagsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    databaseServiceMock = {
      getDatabase: jest.fn(() => ({
        insert: jest.fn().mockReturnThis(),
        values: jest.fn().mockReturnThis(),
        returning: jest.fn().mockResolvedValue([]),
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        delete: jest.fn().mockReturnThis(),
      })) as any
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsTagsService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();

    service = module.get<RestaurantsTagsService>(RestaurantsTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const mockCreateDto = { id_tags: [1, 2, 3] };
    const mockRestaurantId = 1;

    it('should create restaurant tags', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [[], [], []], 
      };

      const result = await service.create(mockCreateDto, mockRestaurantId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException if restaurant ID is invalid', async () => {
      await expect(service.create(mockCreateDto, 1.1)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if tag ID is invalid', async () => {
      await expect(service.create({ id_tags: [1.5] }, mockRestaurantId)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAllByRestaurantId', () => {
    const mockRestaurantId = 1;

    it('should find all tags by restaurant ID', async () => {
      const expectedData = [{
        id_tag: 1,
        id_restaurant: 1
      }];
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: expectedData
      };

      databaseServiceMock.getDatabase = jest.fn(() => ({
        select: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockResolvedValue(expectedData),
      })) as any;

      const result = await service.findAllByRestaurantId(mockRestaurantId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException if restaurant ID is invalid', async () => {
      await expect(service.findAllByRestaurantId(1.1)).rejects.toThrow(BadRequestException);
    });
  });

  describe('update', () => {
    const mockRestaurantId = 1;
    const mockUpdateDto = { id_tags: [1, 2, 3] };

    it('should update restaurant tags', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully updated',
        data: [[], [], []],
      };

      const result = await service.update(mockRestaurantId, mockUpdateDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException if restaurant ID is invalid', async () => {
      await expect(service.update(1.1, mockUpdateDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if nothing to update', async () => {
      await expect(service.update(mockRestaurantId, { id_tags: undefined })).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if tag ID is invalid', async () => {
      await expect(service.update(mockRestaurantId, { id_tags: [1.5] })).rejects.toThrow(BadRequestException);
    });
  });

  describe('removeAll', () => {
    const mockRestaurantId = 1;

    it('should remove all restaurant tags', async () => {
      const expectedResult = {
        result: true,
        message: 'Delete successful',
        data: [],
      };

      const result = await service.removeAll(mockRestaurantId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException if restaurant ID is invalid', async () => {
      await expect(service.removeAll(1.1)).rejects.toThrow(BadRequestException);
    });
  });
});
