import { Test, TestingModule } from '@nestjs/testing';
import { DishesIngredientsService } from './dishes-ingredients.service';
import { DatabaseService } from '../database/database.service';
import { DishesIngredientsController } from './dishes-ingredients.controller';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { CreateDishesIngredientDto } from './dto/create-dishes-ingredient.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateDishesIngredientDto } from './dto/update-dishes-ingredient.dto';

jest.mock('../database/database.service');

describe('DishesIngredientsService', () => {
  let service: DishesIngredientsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule,
      ],
      controllers: [DishesIngredientsController],
      providers: [
        DishesIngredientsService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();

    service = module.get<DishesIngredientsService>(DishesIngredientsService);
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
              id_dish: 1,
              id_ingredient: 1,
              quantity: 1
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
        ],
        controllers: [DishesIngredientsController],
        providers: [
          DishesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();

      service = module.get<DishesIngredientsService>(DishesIngredientsService);
    });

    const createDto: CreateDishesIngredientDto[] = [
      {
        id_dish: 1,
        id_ingredient: 1,
        quantity: 1
      }
    ];

    it('should create data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [
          [
            {
              id_dish: 1,
              id_ingredient: 1,
              quantity: 1
            }
          ]
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
  });


  describe('findAllByIngredientId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                {
                  id_dish: 1,
                  id_ingredient: 1,
                  quantity: 1
                }
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
        controllers: [DishesIngredientsController],
        providers: [
          DishesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DishesIngredientsService>(DishesIngredientsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1
          }
        ]
      };
      const result = await service.findAllByIngredientId(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllByIngredientId(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on wrong id', async () => {
      await expect(service.findAllByIngredientId(mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });



  describe('findAllByDishId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                {
                  id_dish: 1,
                  id_ingredient: 1,
                  quantity: 1
                }
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
        controllers: [DishesIngredientsController],
        providers: [
          DishesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DishesIngredientsService>(DishesIngredientsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1
          }
        ]
      };
      const result = await service.findAllByDishId(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllByDishId(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on wrong id', async () => {
      await expect(service.findAllByDishId(mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });



  describe('findOne', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                {
                  id_dish: 1,
                  id_ingredient: 1,
                  quantity: 1
                }
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
        controllers: [DishesIngredientsController],
        providers: [
          DishesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DishesIngredientsService>(DishesIngredientsService);
    });

    const mockIdDish = 1;
    const mockIdIngredient = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1
          }
        ]
      };
      const result = await service.findOne(mockIdDish, mockIdIngredient);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findOne(mockIdDish, mockIdIngredient)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on wrong dish id', async () => {
      await expect(service.findOne(mockWrongId, mockIdIngredient)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on wrong ingredient id', async () => {
      await expect(service.findOne(mockIdDish, mockWrongId)).rejects.toThrow(BadRequestException);
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
            {
              id_dish: 1,
              id_ingredient: 1,
              quantity: 1
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
        ],
        controllers: [DishesIngredientsController],
        providers: [
          DishesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DishesIngredientsService>(DishesIngredientsService);
    });

    const mockIdDish = 1;
    const mockIdIngredient = 1;
    const mockWrongId = 1.1;
    const updateDto: UpdateDishesIngredientDto = {
      quantity: 1
    };

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.update(mockWrongId, mockIdIngredient, updateDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.update(mockIdDish, mockWrongId, updateDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.update(mockIdDish, mockIdIngredient, updateDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with updated data', async () => {
      const expectedResult = {
        result: true,
        message: 'Update successful',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1
          }
        ]
      };
      const result = await service.update(mockIdDish, mockIdIngredient, updateDto);
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
              id_dish: 1,
              id_ingredient: 1,
              quantity: 1
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
        ],
        controllers: [DishesIngredientsController],
        providers: [
          DishesIngredientsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DishesIngredientsService>(DishesIngredientsService);
    });

    const mockIdDish = 1;
    const mockIdIngredient = 1;
    const mockWrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.remove(mockWrongId, mockIdIngredient)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.remove(mockIdDish, mockWrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.remove(mockIdDish, mockIdIngredient)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with deleted data', async () => {
      const expectedResult = {
        result: true,
        message: 'Delete successful',
        data: [
          {
            id_dish: 1,
            id_ingredient: 1,
            quantity: 1
          }
        ]
      };
      const result = await service.remove(mockIdDish, mockIdIngredient);
      expect(result).toEqual(expectedResult);
    });
  });
});
