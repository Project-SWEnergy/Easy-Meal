import { Test, TestingModule } from '@nestjs/testing';
import { TagsService } from './tags.service';
import { DatabaseService } from '../database/database.service';

jest.mock('../database/database.service');

describe('TagsService', () => {
  let service: TagsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagsService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();

    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnThis(),
          from: jest.fn().mockReturnThis(),
          execute: jest.fn().mockReturnValueOnce([
            { id: 1, name: 'name', description: 'description' }
          ]) as any
        })) as () => any
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TagsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<TagsService>(TagsService);
    });

    it('should find all tags', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully found',
        data: [
          { id: 1, name: 'name', description: 'description' }
        ]
      };
      const result = await service.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnThis(),
          from: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          execute: jest.fn().mockReturnValueOnce([
            { id: 1, name: 'name', description: 'description' }
          ]) as any
        })) as () => any
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TagsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<TagsService>(TagsService);
    });

    it('should find one tag', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully found',
        data: [{ id: 1, name: 'name', description: 'description' }]
      };
      const result = await service.findOne(1);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException if tagId is not a number', async () => {
      await expect(service.findOne(null)).rejects.toThrow();
    });
  });

  describe ('findByName' , () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnThis(),
          from: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          execute: jest.fn().mockReturnValueOnce([
            { id: 1, name: 'name', description: 'description' }
          ]) as any
        })) as () => any
      };

      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TagsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<TagsService>(TagsService);
    });

    it('should find one tag by name', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully found',
        data: [{ id: 1, name: 'name', description: 'description' }]
      };
      const result = await service.findByName('name');
      expect(result).toEqual(expectedResult);
    });
  });
});
