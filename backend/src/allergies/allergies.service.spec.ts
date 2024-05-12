import { Test, TestingModule } from "@nestjs/testing";
import { AllergiesService } from './allergies.service';
import { DatabaseService } from "../database/database.service";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

jest.mock('../database/database.service');

describe('AllergiesService', () => {
  let service: AllergiesService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllergiesService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();
    service = module.get<AllergiesService>(AllergiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  describe('create', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          insert: jest.fn().mockReturnThis(),
          values: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            { id: 1, name: 'name', icon: 'icon' }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AllergiesService>(AllergiesService);
    });

    const createAllergyDto = {
      name: 'name',
      icon: 'icon'
    };

    it('should create an allergy', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            name: 'name',
            icon: 'icon'
          }
        ]
      };
      const result = await service.create(createAllergyDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.create(createAllergyDto)).rejects.toThrow(InternalServerErrorException);
    });

  });


  describe('findOne', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValueOnce([
                { id: 1, name: 'name', icon: 'icon' }
              ]) as any,
            }),
          }),
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AllergiesService>(AllergiesService);
    });

    const id = 1;
    const wrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.findOne(wrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findOne(id)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found allergy', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 1,
            name: 'name',
            icon: 'icon'
          }
        ]
      };
      const result = await service.findOne(id);
      expect(result).toEqual(expectedResult);
    });
  });


  describe('findAll', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue([
              { id: 1, name: 'name', icon: 'icon' }
            ]) as any,
          }),
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AllergiesService>(AllergiesService);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found allergy', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 1,
            name: 'name',
            icon: 'icon'
          }
        ]
      };
      const result = await service.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          where: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          update: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            { id: 1, name: 'name', icon: 'icon' }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AllergiesService>(AllergiesService);
    });

    const id = 1;
    const wrongId = 1.1;
    const updateAllergyDto = {
      name: 'name',
      icon: 'icon'
    };

    it('should throw BadRequestException for non-integer addressId', async () => {
      await expect(service.update(wrongId, updateAllergyDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.update(id, updateAllergyDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with updated data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully updated: allergy',
        data: [
          {
            id: 1,
            name: 'name',
            icon: 'icon'
          }
        ]
      };
      const result = await service.update(id, updateAllergyDto);
      expect(result).toEqual(expectedResult);
    });
  });


  describe('remove', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          where: jest.fn().mockReturnThis(),
          delete: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            { id: 1, name: 'name', icon: 'icon' }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AllergiesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AllergiesService>(AllergiesService);
    });

    const id = 1;
    const wrongId = 1.1;

    it('should throw BadRequestException for non-integer addressId', async () => {
      await expect(service.remove(wrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.remove(id)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with deleted data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully deleted: allergy',
        data: [
          {
            id: 1,
            name: 'name',
            icon: 'icon'
          }
        ]
      };
      const result = await service.remove(id);
      expect(result).toEqual(expectedResult);
    });

  });
});