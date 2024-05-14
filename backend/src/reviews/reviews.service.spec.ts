import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from './reviews.service';
import { DatabaseService } from '../database/database.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { ReviewsController } from './reviews.controller';
import { InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { UserType } from '../authentication/dto/user-data.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { NotificationsService } from '../notifications/notifications.service';

jest.mock('../database/database.service');
jest.mock('../notifications/notifications.service');

describe('ReviewsService', () => {
  let service: ReviewsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule
      ],
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        NotificationsService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();
    service = module.get<ReviewsService>(ReviewsService);
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
              id_restaurant: 1,
              id_user: 1,
              date: "2024-04-05T08:30:00.000Z",
              score: 1,
              description: "string"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [ReviewsController],
        providers: [
          ReviewsService,
          NotificationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<ReviewsService>(ReviewsService);
    });

    const createDto: CreateReviewDto = {
      id_restaurant: 1,
      id_user: 1,
      date: new Date("2024-04-05T08:30:00.000Z"),
      score: 1,
      description: "string"
    };
    const mockId = 1;
    const mockWrongId = 1.1;

    it('should create data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_restaurant: 1,
            id_user: 1,
            date: "2024-04-05T08:30:00.000Z",
            score: 1,
            description: "string"
          }
        ]
      };
      const result = await service.create(mockId, createDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.create(mockId, createDto)).rejects.toThrow(InternalServerErrorException);
    });


    it('should throw BadRequestException on id error', async () => {
      await expect(service.create(mockWrongId, createDto)).rejects.toThrow(BadRequestException);
    });
  });






  describe('findAllByUserIdAndRole', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id_restaurant: 1,
                      id_user: 1,
                      date: "2024-04-05T08:30:00.000Z",
                      score: 1,
                      description: "string"
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
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [ReviewsController],
        providers: [
          ReviewsService,
          NotificationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<ReviewsService>(ReviewsService);
    });

    const mockId = 1;
    const wrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.findAllByRestaurantId(wrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllByRestaurantId(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id_restaurant: 1,
            id_user: 1,
            date: "2024-04-05T08:30:00.000Z",
            score: 1,
            description: "string"
          }
        ]
      };
      const result = await service.findAllByRestaurantId(mockId);
      expect(result).toEqual(expectedResult);
    });
  });







  describe('findAllByUserId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id_restaurant: 1,
                      id_user: 1,
                      date: "2024-04-05T08:30:00.000Z",
                      score: 1,
                      description: "string"
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
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [ReviewsController],
        providers: [
          ReviewsService,
          NotificationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<ReviewsService>(ReviewsService);
    });

    const mockId = 1;
    const wrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.findAllByUserId(wrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllByUserId(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id_restaurant: 1,
            id_user: 1,
            date: "2024-04-05T08:30:00.000Z",
            score: 1,
            description: "string"
          }
        ]
      };
      const result = await service.findAllByUserId(mockId);
      expect(result).toEqual(expectedResult);
    });
  });




  describe('update', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          update: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id_restaurant: 1,
              id_user: 1,
              date: "2024-04-05T08:30:00.000Z",
              score: 1,
              description: "string"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [ReviewsController],
        providers: [
          ReviewsService,
          NotificationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<ReviewsService>(ReviewsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;
    const updateDto = {
      id_restaurant: 1,
      date: new Date("2024-04-17T14:30:00.000Z"),
      score: 3,
      description: "Descrizione"
    }

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.update(mockWrongId, mockId, updateDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.update(mockId, mockWrongId, updateDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.update(mockId, mockId, updateDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with updated data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully updated',
        data: [
          {
            id_restaurant: 1,
            id_user: 1,
            date: "2024-04-05T08:30:00.000Z",
            score: 1,
            description: "string"
          }
        ]
      };
      const result = await service.update(mockId, mockId, updateDto);
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
              id_restaurant: 1,
              id_user: 1,
              date: "2024-04-05T08:30:00.000Z",
              score: 1,
              description: "string"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule
        ],
        controllers: [ReviewsController],
        providers: [
          ReviewsService,
          NotificationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<ReviewsService>(ReviewsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.remove(mockWrongId, mockId)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.remove(mockId, mockWrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.remove(mockId, mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with deleted data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully deleted',
        data: [
          {
            id_restaurant: 1,
            id_user: 1,
            date: "2024-04-05T08:30:00.000Z",
            score: 1,
            description: "string"
          }
        ]
      };
      const result = await service.remove(mockId, mockId);
      expect(result).toEqual(expectedResult);
    });
  });
});
