import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { DatabaseService } from '../database/database.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';


jest.mock('../database/database.service');

describe('NotificationsService', () => {
  let service: NotificationsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
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
              title: 'title',
              message: 'message',
              id_receiver: 1,
              role: UserType.user,
              visualized: false
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          NotificationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<NotificationsService>(NotificationsService);
    });

    const createDto = {
      title: 'title',
      message: 'message',
      id_receiver: 1,
      role: UserType.user,
    };

    it('should create data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            title: 'title',
            message: 'message',
            id_receiver: 1,
            role: UserType.user,
            visualized: false
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



  describe('findAllByUserIdAndRole', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                {
                  id: 1,
                  title: 'title',
                  message: 'message',
                  id_receiver: 1,
                  role: UserType.user,
                  visualized: false
                }
              ]) as any
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          NotificationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<NotificationsService>(NotificationsService);
    });

    const mockId = 1;
    const wrongId = 1.1;
    const mockRole = UserType.user;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.findAllByUserIdAndRole(wrongId, mockRole)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAllByUserIdAndRole(mockId, mockRole)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 1,
            title: 'title',
            message: 'message',
            id_receiver: 1,
            role: UserType.user,
            visualized: false
          }
        ]
      };
      const result = await service.findAllByUserIdAndRole(mockId, mockRole);
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
              id: 1,
              title: 'title',
              message: 'message',
              id_receiver: 1,
              role: UserType.user,
              visualized: true
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          NotificationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<NotificationsService>(NotificationsService);
    });

    const mockIdNotification = 1;
    const mockWrongIdNotification = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.update(mockWrongIdNotification)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.update(mockIdNotification)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with updated data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully updated',
        data: [
          {
            id: 1,
            title: 'title',
            message: 'message',
            id_receiver: 1,
            role: UserType.user,
            visualized: true
          }
        ]
      };
      const result = await service.update(mockIdNotification);
      expect(result).toEqual(expectedResult);
    });
  });
});
