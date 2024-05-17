import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsService } from './reservations.service';
import { DatabaseService } from '../database/database.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersReservationsModule } from '../users-reservations/users-reservations.module';
import { UsersReservationsService } from '../users-reservations/users-reservations.service';
import { ReservationsController } from './reservations.controller';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';


jest.mock('../database/database.service');
jest.mock('../notifications/notifications.service');
jest.mock('../users-reservations/users-reservations.service');

describe('ReservationsService', () => {
  let service: ReservationsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule,
        NotificationsModule,
        UsersReservationsModule,
      ],
      controllers: [ReservationsController],
      providers: [
        ReservationsService,
        NotificationsService,
        UsersReservationsService,
      ],
    }).compile();
    service = module.get<ReservationsService>(ReservationsService);
  });

  afterEach(() => {
    jest.clearAllMocks(); // Ripristina lo stato di tutti i mock dopo ogni test
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
              id: 13,
              id_restaurant: 1,
              date: "2024-04-05T08:30:00.000Z",
              partecipants: 12,
              reservation_state: "In attesa",
              bill_splitting_method: "Equidiviso",
              paid_orders: 0
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<ReservationsService>(ReservationsService);
    });

    const createDto: CreateReservationDto = {
      restaurantId: 1,
      date: new Date("2024-04-05T08:30:00.000Z"),
      partecipants: 1,
      reservation_state: "In attesa",
      bill_splitting_method: "Equidiviso",
      paid_orders: 1
    };
    const mockId = 1;
    const mockWrongId = 1.1;

    it('should create data', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully created: Reservation',
        data: [
          {
            id: 13,
            id_restaurant: 1,
            date: "2024-04-05T08:30:00.000Z",
            partecipants: 12,
            reservation_state: "In attesa",
            bill_splitting_method: "Equidiviso",
            paid_orders: 0
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


    it('should throw BadRequestException on bill splitting method  error', async () => {
      const wrongDto = {
        restaurantId: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        partecipants: 1,
        reservation_state: "In attesa",
        bill_splitting_method: "string",
        paid_orders: 1
      }
      await expect(service.create(wrongDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on reservation state  error', async () => {
      const wrongDto = {
        restaurantId: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        partecipants: 1,
        reservation_state: "string",
        bill_splitting_method: "Equidiviso",
        paid_orders: 1
      }
      await expect(service.create(wrongDto)).rejects.toThrow(BadRequestException);
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
                  id: 13,
                  id_restaurant: 1,
                  date: "2024-04-05T08:30:00.000Z",
                  partecipants: 12,
                  reservation_state: "In attesa",
                  bill_splitting_method: "Equidiviso",
                  paid_orders: 0
                }
              ]) as any
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<ReservationsService>(ReservationsService);
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
            id: 13,
            id_restaurant: 1,
            date: "2024-04-05T08:30:00.000Z",
            partecipants: 12,
            reservation_state: "In attesa",
            bill_splitting_method: "Equidiviso",
            paid_orders: 0
          }
        ]
      };
      const result = await service.findAllByRestaurantId(mockId);
      expect(result).toEqual(expectedResult);
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
                  id: 13,
                  id_restaurant: 1,
                  date: "2024-04-05T08:30:00.000Z",
                  partecipants: 12,
                  reservation_state: "In attesa",
                  bill_splitting_method: "Equidiviso",
                  paid_orders: 0
                }
              ]) as any
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<ReservationsService>(ReservationsService);
    });

    const mockId = 1;
    const wrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.findOne(wrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findOne(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 13,
            id_restaurant: 1,
            date: "2024-04-05T08:30:00.000Z",
            partecipants: 12,
            reservation_state: "In attesa",
            bill_splitting_method: "Equidiviso",
            paid_orders: 0
          }
        ]
      };
      const result = await service.findOne(mockId);
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
              id: 13,
              id_restaurant: 1,
              date: "2024-04-05T08:30:00.000Z",
              partecipants: 12,
              reservation_state: "In attesa",
              bill_splitting_method: "Equidiviso",
              paid_orders: 0
            }
          ]) as any
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<ReservationsService>(ReservationsService);
    });

    const mockId = 1;
    const wrongId = 1.1;
    const updateDto = {
      partecipants: 12,
      reservation_state: "In attesa",
      bill_splitting_method: "Equidiviso"
    }

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.update(wrongId, updateDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.update(mockId, updateDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found data', async () => {
      const expectedResult = {
        result: true,
        message: 'Update successful',
        data: [
          {
            id: 13,
            id_restaurant: 1,
            date: "2024-04-05T08:30:00.000Z",
            partecipants: 12,
            reservation_state: "In attesa",
            bill_splitting_method: "Equidiviso",
            paid_orders: 0
          }
        ]
      };
      const result = await service.update(mockId, updateDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw BadRequestException on bill splitting method  error', async () => {
      const wrongDto = {
        partecipants: 12,
        reservation_state: "In attesa",
        bill_splitting_method: "asd"
      }
      await expect(service.update(mockId, wrongDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException on reservation state  error', async () => {
      const wrongDto = {
        partecipants: 12,
        reservation_state: "asd",
        bill_splitting_method: "Equidiviso"
      }
      await expect(service.update(mockId, wrongDto)).rejects.toThrow(BadRequestException);
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
              id: 13,
              id_restaurant: 1,
              date: "2024-04-05T08:30:00.000Z",
              partecipants: 12,
              reservation_state: "In attesa",
              bill_splitting_method: "Equidiviso",
              paid_orders: 0
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ReservationsService,
          NotificationsService,
          UsersReservationsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<ReservationsService>(ReservationsService);
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
        message: 'Successfully deleted: reservation',
        data: [
          {
            id: 13,
            id_restaurant: 1,
            date: "2024-04-05T08:30:00.000Z",
            partecipants: 12,
            reservation_state: "In attesa",
            bill_splitting_method: "Equidiviso",
            paid_orders: 0
          }
        ]
      };
      const result = await service.remove(mockId);
      expect(result).toEqual(expectedResult);
    });
  });




  describe('sendNotificationUpdate', () => {
    let service: ReservationsService;
    let notificationsService: NotificationsService;
    let usersReservationsService: Partial<UsersReservationsService>;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule,
          UsersReservationsModule,
        ],
        controllers: [ReservationsController],
        providers: [
          ReservationsService,
          NotificationsService,
          { provide: UsersReservationsService, useValue: usersReservationsService }
        ],
      }).compile();
      service = module.get<ReservationsService>(ReservationsService);
      notificationsService = module.get<NotificationsService>(NotificationsService);
      usersReservationsService = module.get<UsersReservationsService>(UsersReservationsService);
    });

    const mockId = 1;

    it('should throw InternalServerErrorException if an error occurs', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new InternalServerErrorException());
      await expect(service.sendNotificationUpdate(mockId)).rejects.toThrow(InternalServerErrorException);
    });

  });



  describe('sendNotificationCreate', () => {
    let service: ReservationsService;
    let notificationsService: NotificationsService;
    let usersReservationsService: Partial<UsersReservationsService>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule,
          UsersReservationsModule,
        ],
        controllers: [ReservationsController],
        providers: [
          ReservationsService,
          NotificationsService,
          { provide: UsersReservationsService, useValue: usersReservationsService }
        ],
      }).compile();
      service = module.get<ReservationsService>(ReservationsService);
      notificationsService = module.get<NotificationsService>(NotificationsService);
      usersReservationsService = module.get<UsersReservationsService>(UsersReservationsService);
    });
  
    const mockId = 1;
    const mockFindOneResult = {
      result: true,
      message: 'Research successful',
      data: [
        {
          id: 13,
          id_restaurant: 1,
          date: "2024-04-05T08:30:00.000Z",
          partecipants: 12,
          reservation_state: "In attesa",
          bill_splitting_method: "Equidiviso",
          paid_orders: 0
        }
      ]
    };
  
    it('should throw InternalServerErrorException if an error occurs', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new InternalServerErrorException());
  
      await expect(service.sendNotificationCreate(mockId)).rejects.toThrow(InternalServerErrorException);
    });
  
  
    it('should not send notification if reservation is not associated with a restaurant', async () => {
      const mockFindOneResultWithoutRestaurant = {
        result: true,
        message: 'Research successful',
        data: [{}]
      };
  
      jest.spyOn(service, 'findOne').mockResolvedValue(mockFindOneResultWithoutRestaurant);
  
      await service.sendNotificationCreate(mockId);
  
      expect(notificationsService.create).not.toHaveBeenCalled();
    });
  
  });

});
