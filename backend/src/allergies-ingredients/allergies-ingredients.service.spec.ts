import { Test, TestingModule } from '@nestjs/testing';
import { AllergiesIngredientsService } from './allergies-ingredients.service';
import { DatabaseService } from '../database/database.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';


jest.mock('../database/database.service');

describe('AllergiesIngredientsService', () => {
  let service: AllergiesIngredientsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllergiesIngredientsService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();
    service = module.get<AllergiesIngredientsService>(AllergiesIngredientsService);
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
            {
              id_allergy: 1,
              id_ingredient: 1
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AllergiesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AllergiesIngredientsService>(AllergiesIngredientsService);
    });

    const createAllergyIngredientDto = {
      id_allergy: 1,
      id_ingredient: 1
    };

    it('should create data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_allergy: 1,
            id_ingredient: 1
          }
        ]
      };
      const result = await service.create(createAllergyIngredientDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.create(createAllergyIngredientDto)).rejects.toThrow(InternalServerErrorException);
    });
  });



  describe('findAllByAllergyId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id_allergy: 1,
                      id_ingredient: 1
                    }
                  ]) as any
                })
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AllergiesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AllergiesIngredientsService>(AllergiesIngredientsService);
    });

    const mockId = 1;
    const wrongId = 1.1;

    
    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.findAllByAllergyId(wrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllByAllergyId(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id_allergy: 1,
            id_ingredient: 1
          }
        ]
      };
      const result = await service.findAllByAllergyId(mockId);
      expect(result).toEqual(expectedResult);
    });
  });


  describe('findAllByIngredientId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id_allergy: 1,
                      id_ingredient: 1
                    }
                  ]) as any
                })
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AllergiesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AllergiesIngredientsService>(AllergiesIngredientsService);
    });

    const mockId = 1;
    const wrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.findAllByIngredientId(wrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllByIngredientId(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id_allergy: 1,
            id_ingredient: 1
          }
        ]
      };
      const result = await service.findAllByIngredientId(mockId);
      expect(result).toEqual(expectedResult);
    });
  });



  describe('findOne', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id_allergy: 1,
                      id_ingredient: 1
                    }
                  ]) as any
                })
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AllergiesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AllergiesIngredientsService>(AllergiesIngredientsService);
    });

    const mockIdAllergy = 1;
    const mockIdIngredient = 1;
    const wrongId = 1.1;
    
    it('should throw BadRequestException for non-integer id allergy', async () => {
      await expect(service.findOne(wrongId, mockIdIngredient)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for non-integer id ingredient', async () => {
      await expect(service.findOne(mockIdAllergy, wrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findOne(mockIdAllergy, mockIdIngredient)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id_allergy: 1,
            id_ingredient: 1
          }
        ]
      };
      const result = await service.findOne(mockIdAllergy, mockIdIngredient);
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
            {
              id_allergy: 1,
              id_ingredient: 1
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AllergiesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AllergiesIngredientsService>(AllergiesIngredientsService);
    });

    const mockIdAllergy = 1;
    const mockIdIngredient = 1;
    const wrongId = 1.1;

    it('should throw BadRequestException for non-integer id allergy', async () => {
      await expect(service.remove(wrongId, mockIdIngredient)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for non-integer id ingredient', async () => {
      await expect(service.remove(mockIdAllergy, wrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.remove(mockIdAllergy, mockIdIngredient)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with deleted data', async () => {
      const expectedResult = {
        result: true,
        message: 'Delete successful',
        data: [
          {
            id_allergy: 1,
            id_ingredient: 1
          }
        ]
      };
      const result = await service.remove(mockIdAllergy, mockIdIngredient);
      expect(result).toEqual(expectedResult);
    });

  });
});
