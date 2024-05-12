import { Test, TestingModule } from '@nestjs/testing';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import { TransactionLogsService } from '../transaction-logs/transaction-logs.service';
import { OrderedDishesService } from '../ordered-dishes/ordered-dishes.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { ReservationsService } from '../reservations/reservations.service';
import { NotificationsService } from '../notifications/notifications.service';
import { UsersReservationsService } from '../users-reservations/users-reservations.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

jest.mock('../database/database.service');
jest.mock('./bills.service');
jest.mock('../authorization/authorization.service');
jest.mock('../reservations/reservations.service');
jest.mock('../ordered-dishes/ordered-dishes.service');
jest.mock('../transaction-logs/transaction-logs.service');

describe('BillsController', () => {
  let controller: BillsController;
  let service: BillsService;
  let transactionLogsService: TransactionLogsService;
  let orderedDishesService: OrderedDishesService;
  let authorizationService: AuthorizationService;
  let reservationsService: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule
      ],
      controllers: [BillsController],
      providers: [BillsService, TransactionLogsService, OrderedDishesService, ReservationsService, NotificationsService, UsersReservationsService],
    }).compile();

    controller = module.get<BillsController>(BillsController);
    service = module.get<BillsService>(BillsService);
    transactionLogsService = module.get<TransactionLogsService>(TransactionLogsService);
    orderedDishesService = module.get<OrderedDishesService>(OrderedDishesService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
    reservationsService = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('createProportional', () => {

    it('should throw InternalServerErrorException', async () => {
      const createBillDto = {
        id_user: 1,
        id_reservation: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        total_bill: 1,
        bill_state: "string",
        id_ordered_dishes: undefined
      }
      const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
      const mockAuth = { token: { id: 'mockedUserId' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      await expect(controller.createProportional(createBillDto, mockRequest)).rejects.toThrow(InternalServerErrorException);
    });

    it('should create a new proportional bill', async () => {
      const createBillDto = {
        id_user: 1,
        id_reservation: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        total_bill: 1,
        bill_state: "string",
        id_ordered_dishes: [1, 2]
      }
      const mockAuth = { token: { id: 'mockedUserId' } };
      const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
      const expectedResult: any = {
        result: true,
        message: "Update successful",
        data: [
          {
            id: 35,
            id_user: 1,
            id_reservation: 1,
            date: new Date("2024-04-05T08:30:00.000Z"),
            total_bill: 12.45,
            bill_state: "Concluso"
          }
        ]
      };
      const mockReservationResult = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            id_restaurant: 1,
            date: new Date("2024-04-05T08:30:00.000Z"),
            partecipants: 12,
            reservation_state: "In attesa",
            bill_splitting_method: "Equidiviso",
            paid_orders: 5
          }
        ]
      }
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      (reservationsService.update as jest.Mock).mockImplementation(() => {
        return mockReservationResult;
      });
      (reservationsService.findOne as jest.Mock).mockImplementation(() => {
        return mockReservationResult;
      });
      (service.update as jest.Mock).mockImplementation(() => {
        return expectedResult;
      });
      const result = await controller.createProportional(createBillDto, mockRequest);
      expect(result).toEqual(expectedResult);
    });
  });



  describe('createEquidivided', () => {

    it('should throw InternalServerErrorException', async () => {
      const createBillDto = {
        id_user: 1,
        id_reservation: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        total_bill: 1,
        bill_state: "string",
        id_ordered_dishes: undefined
      }
      const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
      (authorizationService.isAuthorized as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException;
      });
      await expect(controller.createProportional(createBillDto, mockRequest)).rejects.toThrow(InternalServerErrorException);
    });

    it('should create a new proportional bill', async () => {
      const createBillDto = {
        id_user: 1,
        id_reservation: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        total_bill: 1,
        bill_state: "string",
        id_ordered_dishes: undefined
      }
      const mockAuth = { token: { id: 'mockedUserId' } };
      const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
      const expectedResult: any = {
        result: true,
        message: "Update successful",
        data: [
          {
            id: 35,
            id_user: 1,
            id_reservation: 1,
            date: new Date("2024-04-05T08:30:00.000Z"),
            total_bill: 12.45,
            bill_state: "Concluso"
          }
        ]
      };
      const mockReservationResult = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            id_restaurant: 1,
            date: new Date("2024-04-05T08:30:00.000Z"),
            partecipants: 12,
            reservation_state: "In attesa",
            bill_splitting_method: "Equidiviso",
            paid_orders: 5
          }
        ]
      }
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      (reservationsService.update as jest.Mock).mockImplementation(() => {
        return mockReservationResult;
      });
      (reservationsService.findOne as jest.Mock).mockImplementation(() => {
        return mockReservationResult;
      });
      (service.update as jest.Mock).mockImplementation(() => {
        return expectedResult;
      });
      const result = await controller.createEquidivided(createBillDto, mockRequest);
      expect(result).toEqual(expectedResult);
    });
  });


  describe('findAllByReservationId', () => {
    const mockAuth = { token: { id: 'mockedUserId' } };
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const expectedResult: any = {
      result: true,
      message: "Research successful",
      data: [
        {
          id: 35,
          id_user: 1,
          name_user: "Cliente",
          surname_user: "Abituale",
          id_reservation: 1,
          date: "2024-04-05T08:30:00.000Z",
          total_bill: 12.45,
          bill_state: "Concluso",
          bill_details: []
        },
      ]
    };

    it('should find all the bills of a reservation', async () => {
      const mockId = "1";
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      (service.findAllByReservationId as jest.Mock).mockImplementation(() => {
        return expectedResult;
      });
      const result = await controller.findAllByReservationId(mockId, mockRequest);
      expect(result).toEqual(expectedResult);
    });

  })



  describe('findOne', () => {
    const mockAuth = { token: { id: 'mockedUserId' } };
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const expectedResult: any = {
      result: true,
      message: "Research successful",
      data: [
        {
          id: 35,
          id_user: 1,
          name_user: "Cliente",
          surname_user: "Abituale",
          id_reservation: 1,
          date: "2024-04-05T08:30:00.000Z",
          total_bill: 12.45,
          bill_state: "Concluso",
          bill_details: []
        },
      ]
    };

    it('should find all the bills of a reservation', async () => {
      const mockId = "1";
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      (service.findOne as jest.Mock).mockImplementation(() => {
        return expectedResult;
      });
      const result = await controller.findOne(mockId, mockRequest);
      expect(result).toEqual(expectedResult);
    });

  })



  describe('did-user-paid-once', () => { 
    const mockAuth = { token: { id: 'mockedUserId' } };
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const expectedResult: any = {
      result: true,
      message: "Research successful",
      data: true
    };

    it('should return a boolean data', async () => {
      const mockIdUser = "1";
      const mockIdRestaurant = "1";
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      (service.didUserPaidOnce as jest.Mock).mockImplementation(() => {
        return expectedResult;
      });
      const result = await controller.didUserPaidOnce(mockIdUser, mockIdRestaurant,  mockRequest);
      expect(result).toEqual(expectedResult);
    });

  });




  describe('update', () => { 
    const mockAuth = { token: { id: 'mockedUserId' } };
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const mockId = "1";
    const mockBody = {
      total_bill: 12.55,
      bill_state: "In corso"
    }
    const expectedResult: any = {
      result: true,
      message: "Research successful",
      data: {
        id: 7,
        id_user: 1,
        id_reservation: 2,
        date: "2024-04-05T08:30:00.000Z",
        total_bill: 12.55,
        bill_state: "In corso"
      }
    };

    it('should return a update the bill', async () => {
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      (service.update as jest.Mock).mockImplementation(() => {
        return expectedResult;
      });
      const result = await controller.update(mockId, mockBody,  mockRequest);
      expect(result).toEqual(expectedResult);
    });

  });




  describe('remove', () => { 
    const mockAuth = { token: { id: 'mockedUserId' } };
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const mockId = "1";
    const expectedResult: any = {
      result: true,
      message: "Delete successful",
      data: {
        id: 7,
        id_user: 1,
        id_reservation: 2,
        date: "2024-04-05T08:30:00.000Z",
        total_bill: 12.55,
        bill_state: "In corso"
      }
    };

    it('should return a delete the bill', async () => {
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      (service.remove as jest.Mock).mockImplementation(() => {
        return expectedResult;
      });
      const result = await controller.remove(mockId, mockRequest);
      expect(result).toEqual(expectedResult);
    });

  });
});
