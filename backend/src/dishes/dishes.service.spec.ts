import { Test, TestingModule } from '@nestjs/testing';
import { DishesService } from './dishes.service';
import { DatabaseService } from '../database/database.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { DishesController } from './dishes.controller';
import { CreateDishDto } from './dto/create-dish.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateDishDto } from './dto/update-dish.dto';

jest.mock('../database/database.service');

describe('DishesService', () => {
  let service: DishesService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule,
        UploadFileModule
      ],
      controllers: [DishesController],
      providers: [
        DishesService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();

    service = module.get<DishesService>(DishesService);
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
              name: "TEST_PIATTO",
              description: "Descrizione",
              price: 12.99,
              image: "TEST"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          UploadFileModule
        ],
        controllers: [DishesController],
        providers: [
          DishesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DishesService>(DishesService);
    });

    const createDto: CreateDishDto = {
      id_restaurant: 1,
      name: "TEST_PIATTO",
      description: "Descrizione",
      price: 12,
      image: "TEST"
    };

    it('should create data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully created: dish',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "TEST_PIATTO",
            description: "Descrizione",
            price: 12.99,
            image: "TEST"
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
  });



  describe('findAllByRestaurantId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                {
                  id: 1,
                  id_restaurant: 1,
                  name: "TEST_PIATTO",
                  description: "Descrizione",
                  price: 12.99,
                  image: "TEST"
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
          UploadFileModule
        ],
        controllers: [DishesController],
        providers: [
          DishesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DishesService>(DishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful: dish',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "TEST_PIATTO",
            description: "Descrizione",
            price: 12.99,
            image: "TEST"
          }
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



  describe('findOne', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                {
                  id: 1,
                  id_restaurant: 1,
                  name: "TEST_PIATTO",
                  description: "Descrizione",
                  price: 12.99,
                  image: "TEST"
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
          UploadFileModule
        ],
        controllers: [DishesController],
        providers: [
          DishesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DishesService>(DishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful: dish',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "TEST_PIATTO",
            description: "Descrizione",
            price: 12.99,
            image: "TEST"
          }
        ]
      };
      const result = await service.findOne(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findOne(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on wrong id', async () => {
      await expect(service.findOne(mockWrongId)).rejects.toThrow(BadRequestException);
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
              id: 1,
              id_restaurant: 1,
              name: "TEST_PIATTO",
              description: "Descrizione",
              price: 12.99,
              image: "TEST"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          UploadFileModule
        ],
        controllers: [DishesController],
        providers: [
          DishesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DishesService>(DishesService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;
    const updateDto: UpdateDishDto = {
      name: "TEST_PIATTO",
      description: "Descrizione",
      price: 12.99,
      image: "TEST"
    };

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.update(mockWrongId, updateDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.update(mockId, updateDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with updated data', async () => {
      const expectedResult = {
        result: true,
        message: 'Update successful: dish',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "TEST_PIATTO",
            description: "Descrizione",
            price: 12.99,
            image: "TEST"
          }
        ]
      };
      const result = await service.update(mockId, updateDto);
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
              id: 1,
              id_restaurant: 1,
              name: "TEST_PIATTO",
              description: "Descrizione",
              price: 12.99,
              image: "TEST"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          UploadFileModule
        ],
        controllers: [DishesController],
        providers: [
          DishesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DishesService>(DishesService);
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
      await expect(service.remove(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with deleted data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully deleted: dish',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "TEST_PIATTO",
            description: "Descrizione",
            price: 12.99,
            image: "TEST"
          }
        ]
      };
      const result = await service.remove(mockId);
      expect(result).toEqual(expectedResult);
    });
  });

});
