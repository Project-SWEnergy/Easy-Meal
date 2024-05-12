import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsService } from './ingredients.service';
import { DatabaseService } from '../database/database.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { IngredientsController } from './ingredients.controller';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

jest.mock('../database/database.service');

const expectedQueryResult = {
  id: 1,
  id_restaurant: 1,
  name: "TEST_ingredient",
  unit_of_measurement: "g"
}


describe('IngredientsService', () => {
  let service: IngredientsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule,
      ],
      controllers: [IngredientsController],
      providers: [
        IngredientsService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();

    service = module.get<IngredientsService>(IngredientsService);
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
              id: 1,
              id_restaurant: 1,
              name: "TEST_ingredient",
              unit_of_measurement: "g"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
        ],
        controllers: [IngredientsController],
        providers: [
          IngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<IngredientsService>(IngredientsService);
    });

    const createDto: CreateIngredientDto =
    {
      id_restaurant: 1,
      name: "TEST_ingredient",
      unit_of_measurement: "g"
    };

    it('should create data', async () => {
      const expectedResult = {
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
      const result = await service.create(createDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.create(createDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on isValidUnitsOfMeasurement error', async () => {
      const createDto: CreateIngredientDto =
      {
        id_restaurant: 1,
        name: "TEST_ingredient",
        unit_of_measurement: "asd"
      };
      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on id error', async () => {
      const createDto: CreateIngredientDto =
      {
        id_restaurant: 1.1,
        name: "TEST_ingredient",
        unit_of_measurement: "g"
      };
      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });

  });



  describe('findAllByIngredientId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                expectedQueryResult
              ]) as any
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
        ],
        controllers: [IngredientsController],
        providers: [
          IngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<IngredientsService>(IngredientsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          expectedQueryResult
        ]
      };
      const result = await service.findAllByRestaurantId(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllByRestaurantId(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on wrong id', async () => {
      await expect(service.findAllByRestaurantId(mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });




  describe('findOneByIngredientId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                expectedQueryResult
              ]) as any
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
        ],
        controllers: [IngredientsController],
        providers: [
          IngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<IngredientsService>(IngredientsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          expectedQueryResult
        ]
      };
      const result = await service.findOneByIngredientId(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findOneByIngredientId(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on wrong id', async () => {
      await expect(service.findOneByIngredientId(mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });




  describe('update', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          where: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          update: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce(
            [
              expectedQueryResult
            ]
          ) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
        ],
        controllers: [IngredientsController],
        providers: [
          IngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<IngredientsService>(IngredientsService);
    });

    const mockIdDish = 1;
    const mockWrongId = 1.1;
    const updateDto: UpdateIngredientDto = {
      name: "Updated Name",
      unit_of_measurement: "g"
    };

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.update(mockWrongId, updateDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.update(mockIdDish, updateDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with updated data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully updated',
        data: [
          expectedQueryResult
        ]
      };
      const result = await service.update(mockIdDish, updateDto);
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
            expectedQueryResult
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
        ],
        controllers: [IngredientsController],
        providers: [
          IngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<IngredientsService>(IngredientsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.remove(mockWrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.remove(mockId,)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with deleted data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully deleted',
        data: [
          expectedQueryResult
        ]
      };
      const result = await service.remove(mockId);
      expect(result).toEqual(expectedResult);
    });
  });

});
