import { Test, TestingModule } from '@nestjs/testing';
import { UsersReservationsService } from './users-reservations.service';
import { DatabaseService } from '../database/database.service';
import { BadRequestException } from '@nestjs/common';
import { ResultUsersReservationDto } from './dto/result-users-reservation.dto';
import { InviteUsersReservationDto } from './dto/invite-users-reservation.dto';
import { NotificationsService } from '../notifications/notifications.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { UsersReservationsController } from './users-reservations.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { ReservationsService } from '../reservations/reservations.service';

jest.mock('../database/database.service');


describe('UsersReservationsService', () => {
  let service: UsersReservationsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule,
        NotificationsModule
      ],
      controllers: [UsersReservationsController],
      providers: [UsersReservationsService, NotificationsService, { provide: DatabaseService, useValue: databaseServiceMock }, ReservationsService],
    }).compile();

    service = module.get<UsersReservationsService>(UsersReservationsService);
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
              id_user: 1,
              id_reservation: 1,
              accepted: true
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule
        ],
        controllers: [UsersReservationsController],
        providers: [UsersReservationsService, NotificationsService, { provide: DatabaseService, useValue: databaseServiceMock }, ReservationsService],
      }).compile();
  
      service = module.get<UsersReservationsService>(UsersReservationsService);
    });

    it('should create and return a response with status 200', async () => {
      const createUsersReservationDto = {
        id_user: 1,
        id_reservation: 1,
        accepted: true
      };
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      //jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      const result = await service.create(createUsersReservationDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if the user ID is not an integer', async () => {
      const createUsersReservationDto = {
        id_user: 1,
        id_reservation: 1,
        accepted: true
      };

      createUsersReservationDto.id_user = 1.5;
      try {
        await service.create(createUsersReservationDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid user ID');
      }
    });

    it('should throw an error if the reservation ID is not an integer', async () => {
      const createUsersReservationDto = {
        id_user: 1,
        id_reservation: 1,
        accepted: true
      };

      createUsersReservationDto.id_reservation = 1.5;
      try {
        await service.create(createUsersReservationDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid reservation ID');
      }
    });
  });

  describe('invite', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnThis(),
          from: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          insert: jest.fn().mockReturnThis(),
          values: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id_user: 1,
              id_reservation: 1,
              accepted: false
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule
        ],
        controllers: [UsersReservationsController],
        providers: [UsersReservationsService, NotificationsService, { provide: DatabaseService, useValue: databaseServiceMock }, ReservationsService],
      }).compile();
  
      service = module.get<UsersReservationsService>(UsersReservationsService);
    });

    //TODO: FIX this test
    //FIXME
    /*it('should invite users and return a response with status 200', async () => {
      const inviteUsersDto : InviteUsersReservationDto= {
        id_reservation: 1,
        email_users: [''],
      };
      const expectedResult : ResultUsersReservationDto = {
        result: true,
        message: 'Successfully created',
        data: [
          
          {
            id_user: 1,
            id_reservation: 1,
            accepted: false
          }
          
        ]
      };

      const result = await service.invite(inviteUsersDto);
      expect(result).toEqual(expectedResult);
    });*/

    it('should throw an error if the email is not valid', async () => {
      const inviteUsersDto: InviteUsersReservationDto = {
        id_reservation: 1,
        email_users: [''],
      };

      inviteUsersDto.email_users = ['test'];
      try {
        await service.invite(inviteUsersDto);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid email');
      }
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
                  leftJoin: jest.fn().mockReturnValue({
                    where: jest.fn().mockReturnValue([
                      {
                        id_user: 1,
                        id_reservation: 1,
                        accepted: true
                      }
                    ])
                  })
                })
              })
            })
          })
        })) as () => any
      };

      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule
        ],
        controllers: [UsersReservationsController],
        providers: [UsersReservationsService, NotificationsService, { provide: DatabaseService, useValue: databaseServiceMock }, ReservationsService],
      }).compile();
  
      service = module.get<UsersReservationsService>(UsersReservationsService);
    });

    it('should return data with status 200 for the given user ID', async () => {
      const mockId = 1;
      const mockResult: ResultUsersReservationDto = {
        result: true,
        message: 'Research successfull',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      const result = await service.findAllByUserId(mockId);
      expect(result).toEqual(mockResult);
    });

    it('should throw an error if the user ID is not an integer', async () => {
      const mockId = 1.5;
      try {
        await service.findAllByUserId(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid user ID');
      }
    });

  });

  describe('findAllByReservationId', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                leftJoin: jest.fn().mockReturnValue({
                  leftJoin: jest.fn().mockReturnValue({
                    where: jest.fn().mockReturnValue([
                      {
                        id_user: 1,
                        id_reservation: 1,
                        accepted: true
                      }
                    ])
                  })
                })
              })
            })
          })
        })) as () => any
      };

      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule
        ],
        controllers: [UsersReservationsController],
        providers: [UsersReservationsService, NotificationsService, { provide: DatabaseService, useValue: databaseServiceMock }, ReservationsService],
      }).compile();
  
      service = module.get<UsersReservationsService>(UsersReservationsService);
    });

    it('should return data with status 200 for the given reservation ID', async () => {
      const mockId = 1;
      const mockResult: ResultUsersReservationDto = {
        result: true,
        message: 'Research successfull',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      const result = await service.findAllByReservationId(mockId);
      expect(result).toEqual(mockResult);
    });

    it('should throw an error if the reservation ID is not an integer', async () => {
      const mockId = 1.5;
      try {
        await service.findAllByReservationId(mockId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid reservation ID');
      }
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
                  leftJoin: jest.fn().mockReturnValue({
                    where: jest.fn().mockReturnValue([
                      {
                        id_user: 1,
                        id_reservation: 1,
                        accepted: true
                      }
                    ])
                  })
                })
              })
            })
          })
        })) as () => any
      };

      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule
        ],
        controllers: [UsersReservationsController],
        providers: [UsersReservationsService, NotificationsService, { provide: DatabaseService, useValue: databaseServiceMock }, ReservationsService],
      }).compile();
  
      service = module.get<UsersReservationsService>(UsersReservationsService);
    });

    it('should return data with status 200 for the given user ID and reservation ID', async () => {
      const mockUserId = 1;
      const mockReservationId = 1;
      const mockResult: ResultUsersReservationDto = {
        result: true,
        message: 'Research successfull',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      const result = await service.findOne(mockUserId, mockReservationId);
      expect(result).toEqual(mockResult);
    });

    it('should throw an error if the user ID is not an integer', async () => {
      const mockUserId = 1.5;
      const mockReservationId = 1;
      try {
        await service.findOne(mockUserId, mockReservationId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid user ID');
      }
    });

    it('should throw an error if the reservation ID is not an integer', async () => {
      const mockUserId = 1;
      const mockReservationId = 1.5;
      try {
        await service.findOne(mockUserId, mockReservationId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid reservation ID');
      }
    });
  });

  describe('update', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          update: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id_user: 1,
              id_reservation: 1,
              accepted: true
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule
        ],
        controllers: [UsersReservationsController],
        providers: [UsersReservationsService, NotificationsService, { provide: DatabaseService, useValue: databaseServiceMock }, ReservationsService],
      }).compile();
  
      service = module.get<UsersReservationsService>(UsersReservationsService);
    });

    //TODO FIX this test
    //FIXME
    /*it('should update and return a response with status 200', async () => {
      const updateUsersReservationDto = {
        accepted: true
      };
      const mockUserId = 1;
      const mockReservationId = 1;
      const expectedResult = {
        result: true,
        message: 'Successfully updated',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      const result = await service.update(updateUsersReservationDto, mockUserId, mockReservationId);
      expect(result).toEqual(expectedResult);
    });*/

    it('should throw an error if the user ID is not an integer', async () => {
      const updateUsersReservationDto = {
        accepted: true
      };
      const mockUserId = 1.5;
      const mockReservationId = 1;
      try {
        await service.update(updateUsersReservationDto, mockUserId, mockReservationId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid user ID');
      }
    });

    it('should throw an error if the reservation ID is not an integer', async () => {
      const updateUsersReservationDto = {
        accepted: true
      };
      const mockUserId = 1;
      const mockReservationId = 1.5;
      try {
        await service.update(updateUsersReservationDto, mockUserId, mockReservationId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid reservation ID');
      }
    });

  });

  describe ('remove', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          delete: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id_user: 1,
              id_reservation: 1,
              accepted: true
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule
        ],
        controllers: [UsersReservationsController],
        providers: [UsersReservationsService, NotificationsService, { provide: DatabaseService, useValue: databaseServiceMock }, ReservationsService],
      }).compile();
  
      service = module.get<UsersReservationsService>(UsersReservationsService);
    });

    it('should remove and return a response with status 200', async () => {
      const mockUserId = 1;
      const mockReservationId = 1;
      const expectedResult = {
        result: true,
        message: 'Successfully deleted',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      const result = await service.remove(mockUserId, mockReservationId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if the user ID is not an integer', async () => {
      const mockUserId = 1.5;
      const mockReservationId = 1;
      try {
        await service.remove(mockUserId, mockReservationId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid user ID');
      }
    });

    it('should throw an error if the reservation ID is not an integer', async () => {
      const mockUserId = 1;
      const mockReservationId = 1.5;
      try {
        await service.remove(mockUserId, mockReservationId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid reservation ID');
      }
    });
  });
});
