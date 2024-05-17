import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersReservationsModule } from '../users-reservations/users-reservations.module';
import { UsersReservationsService } from '../users-reservations/users-reservations.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ResultReservationsDto } from './dto/result-reservations.dto';
import { UserType } from '../authentication/dto/user-data.dto';

jest.mock('../database/database.service');
jest.mock('./reservations.service');
jest.mock('../authorization/authorization.service');

describe('ReservationsController', () => {
  let controller: ReservationsController;
  let service: Partial<ReservationsService>;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule,
        NotificationsModule,
        UsersReservationsModule,
      ],
      controllers: [ReservationsController],
      providers: [ReservationsService, NotificationsService, UsersReservationsService],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
    service = module.get<ReservationsService>(ReservationsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });




  describe('create', () => {
    beforeEach(async () => {
      service = {
        create: jest.fn(() => ({
          result: true,
          message: 'Successfully created',
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
        })) as () => any,
        sendNotificationCreate: jest.fn(() => (true)) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule,
          UsersReservationsModule,
        ],
        controllers: [ReservationsController],
        providers: [
          { provide: ReservationsService, useValue: service },
          NotificationsService,
          UsersReservationsService
        ],
      }).compile();
      controller = module.get<ReservationsController>(ReservationsController);
      service = module.get<ReservationsService>(ReservationsService);
      authorizationService = module.get<AuthorizationService>(AuthorizationService);
    });

    it('should create a new review and return a response with status 200', async () => {
      const createDto: CreateReservationDto = {
        restaurantId: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        partecipants: 1,
        reservation_state: "string",
        bill_splitting_method: "string",
        paid_orders: 1
      };
      const expectedResult: ResultReservationsDto = {
        result: true,
        message: 'Successfully created',
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
      const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1, role: UserType.user } });
      const result = await controller.create(createDto, mockRequest);
      expect(result).toEqual(expectedResult);
    });
  });





  describe('findAllByRestaurantId', () => {
    beforeEach(async () => {
      service = {
        findAllByRestaurantId: jest.fn(() => ({
          result: true,
          message: 'Successfully created',
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
        })) as () => any,
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule,
          UsersReservationsModule,
        ],
        controllers: [ReservationsController],
        providers: [
          { provide: ReservationsService, useValue: service },
          NotificationsService,
          UsersReservationsService
        ],
      }).compile();
      controller = module.get<ReservationsController>(ReservationsController);
      service = module.get<ReservationsService>(ReservationsService);
      authorizationService = module.get<AuthorizationService>(AuthorizationService);
    });

    const mockId = "1";
    const expectedResult = {
      result: true,
      message: 'Successfully created',
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
    }
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };

    it('should find all notifications by user', async () => {
      jest.spyOn(service, 'findAllByRestaurantId').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1, role: UserType.user } });
      const result = await controller.findAllByRestaurantId(mockRequest);
      expect(result).toEqual(expectedResult);
    });

  });






  describe('findOne', () => {
    beforeEach(async () => {
      service = {
        findOne: jest.fn(() => ({
          result: true,
          message: 'Successfully created',
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
        })) as () => any,
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule,
          UsersReservationsModule,
        ],
        controllers: [ReservationsController],
        providers: [
          { provide: ReservationsService, useValue: service },
          NotificationsService,
          UsersReservationsService
        ],
      }).compile();
      controller = module.get<ReservationsController>(ReservationsController);
      service = module.get<ReservationsService>(ReservationsService);
      authorizationService = module.get<AuthorizationService>(AuthorizationService);
    });

    const mockId = "1";
    const expectedResult = {
      result: true,
      message: 'Successfully created',
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
    }
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };

    it('should find all notifications by user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1, role: UserType.user } });
      const result = await controller.findOne(mockId, mockRequest);
      expect(result).toEqual(expectedResult);
    });

  });






  describe('update', () => {
    beforeEach(async () => {
      service = {
        update: jest.fn(() => ({
          result: true,
          message: 'Successfully created',
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
        })) as () => any,
        sendNotificationUpdate: jest.fn(() => (true)) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule,
          UsersReservationsModule,
        ],
        controllers: [ReservationsController],
        providers: [
          { provide: ReservationsService, useValue: service },
          NotificationsService,
          UsersReservationsService
        ],
      }).compile();
      controller = module.get<ReservationsController>(ReservationsController);
      service = module.get<ReservationsService>(ReservationsService);
      authorizationService = module.get<AuthorizationService>(AuthorizationService);
    });

    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const updateDto = {
      partecipants: 12,
      reservation_state: "In attesa",
      bill_splitting_method: "Equidiviso"
    }
    const expectedResult = {
      result: true,
      message: 'Successfully created',
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
    }
    const mockId = "1";

    it('should update the notification', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.update(mockId, updateDto, mockRequest);
      expect(result).toEqual(expectedResult);
    });

  });





  describe('remove', () => {
    beforeEach(async () => {
      service = {
        remove: jest.fn(() => ({
          result: true,
          message: 'Successfully created',
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
        })) as () => any,
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          DatabaseModule,
          NotificationsModule,
          UsersReservationsModule,
        ],
        controllers: [ReservationsController],
        providers: [
          { provide: ReservationsService, useValue: service },
          NotificationsService,
          UsersReservationsService
        ],
      }).compile();
      controller = module.get<ReservationsController>(ReservationsController);
      service = module.get<ReservationsService>(ReservationsService);
      authorizationService = module.get<AuthorizationService>(AuthorizationService);
    });

    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const expectedResult = {
      result: true,
      message: 'Successfully created',
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
    }
    const mockId = "1";

    it('should remove the notification', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.remove(mockId, mockRequest);
      expect(result).toEqual(expectedResult);
    });

  });
});
