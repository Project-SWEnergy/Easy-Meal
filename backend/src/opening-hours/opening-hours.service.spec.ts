import { Test, TestingModule } from '@nestjs/testing';
import { OpeningHoursService } from './opening-hours.service';
import { DatabaseService } from '../database/database.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { OpeningHoursController } from './opening-hours.controller';
import { CreateOpeningHoursDto } from './dto/create-opening-hours.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateOpeningHoursDto } from './dto/update-opening-hours.dto';

jest.mock('../database/database.service');

const expectedQueryResult = {
  id: 1,
  id_restaurant: 1,
  id_day: 1,
  name_day: "String",
  abbreviation_day: "String",
  order_day: "String",
  opening_time: "String",
  closing_time: "String"
}

describe('OpeningHoursService', () => {
  let service: OpeningHoursService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule,
      ],
      controllers: [OpeningHoursController],
      providers: [
        OpeningHoursService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();
    service = module.get<OpeningHoursService>(OpeningHoursService);
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
            expectedQueryResult
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
        ],
        controllers: [OpeningHoursController],
        providers: [
          OpeningHoursService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OpeningHoursService>(OpeningHoursService);
    });

    const createDto: CreateOpeningHoursDto[] = [
      {
        id_day: 1,
        id_restaurant: 1,
        opening_time: "09:00:00",
        closing_time: "12:00:00"
      }
    ];

    it('should create data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [[expectedQueryResult]]
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

    it('should throw BadRequestException on id error', async () => {
      const createDto: CreateOpeningHoursDto[] = [
        {
          id_day: 1.1,
          id_restaurant: 1.1,
          opening_time: "09:00:00",
          closing_time: "12:00:00"
        }
      ];
      await expect(service.create(createDto)).rejects.toThrow(BadRequestException);
    });

  });




  describe('findAllByRestaurantId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue([
                  expectedQueryResult
                ]) as any
              })
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
        controllers: [OpeningHoursController],
        providers: [
          OpeningHoursService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OpeningHoursService>(OpeningHoursService);
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




  describe('findOne', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue([
                  expectedQueryResult
                ]) as any
              })
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
        controllers: [OpeningHoursController],
        providers: [
          OpeningHoursService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OpeningHoursService>(OpeningHoursService);
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
        controllers: [OpeningHoursController],
        providers: [
          OpeningHoursService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OpeningHoursService>(OpeningHoursService);
    });

    const mockIdDish = 1;
    const mockWrongId = 1.1;
    const updateDto: UpdateOpeningHoursDto = {
      opening_time: "String",
      closing_time: "String"
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
        controllers: [OpeningHoursController],
        providers: [
          OpeningHoursService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<OpeningHoursService>(OpeningHoursService);
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
