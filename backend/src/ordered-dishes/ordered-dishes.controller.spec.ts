import { Test, TestingModule } from '@nestjs/testing';
import { OrderedDishesController } from './ordered-dishes.controller';
import { OrderedDishesService } from './ordered-dishes.service';
import { ReservationsService } from '../reservations/reservations.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CreateOrderedDishDto } from './dto/create-ordered-dish.dto';
import { BadRequestException } from '@nestjs/common';
import { ReservationState } from '../reservations/entities/reservation.entity';
import { ResultOrderedDishDto } from './dto/result-ordered-dish.dto';

jest.mock('./ordered-dishes.service');
jest.mock('../reservations/reservations.service');
jest.mock('../authorization/authorization.service');

describe('OrderedDishesController', () => {
  let controller: OrderedDishesController;
  let service: OrderedDishesService;
  let reservationsService: ReservationsService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [OrderedDishesController],
      providers: [OrderedDishesService, ReservationsService, AuthorizationService, ConfigService],
    }).compile();

    controller = module.get<OrderedDishesController>(OrderedDishesController);
    service = module.get<OrderedDishesService>(OrderedDishesService);
    reservationsService = module.get<ReservationsService>(ReservationsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });




  describe('create', () => {

    it('should throw BadRequestException if no data is provided', async () => {
      const createOrderedDishDto: CreateOrderedDishDto[] = [];
      const req = { cookies: { accessToken: 'validAccessToken' } };
      await expect(controller.create(createOrderedDishDto, req)).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if reservation state is invalid', async () => {
      const createOrderedDishDto: CreateOrderedDishDto[] = [{
        id_reservation: 1,
        id_user: 0,
        id_dish: 0,
        paid: false,
        removed_ingredients: []
      }];
      const reservationFound = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            id_restaurant: 1,
            date: "2024-04-05T08:30:00.000Z",
            partecipants: 12,
            reservation_state: ReservationState.Rifiutata,
            bill_splitting_method: "Equidiviso",
            paid_orders: 5
          }
        ]
      }
      const req = { cookies: { accessToken: 'validAccessToken' } };
      const findOneSpy = jest.spyOn(reservationsService, 'findOne').mockResolvedValue(reservationFound);

      await expect(controller.create(createOrderedDishDto, req)).rejects.toThrow(BadRequestException);
      expect(findOneSpy).toHaveBeenCalledWith(createOrderedDishDto[0].id_reservation);
    });


    it('should create new ordered dishes and send notification update if id_dish is provided', async () => {
      const createOrderedDishDto: CreateOrderedDishDto[] = [{
        id_reservation: 1, id_dish: 1,
        id_user: 0,
        paid: false,
        removed_ingredients: [1, 2, 3]
      }];
      const reservationFound = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            id_restaurant: 1,
            date: "2024-04-05T08:30:00.000Z",
            partecipants: 12,
            reservation_state: ReservationState.InCorso,
            bill_splitting_method: "Equidiviso",
            paid_orders: 5
          }
        ]
      }
      const createResult = {
        result: true,
        message: "Research successful",
        data: [
          [
            {
              id: 44,
              id_user: 1,
              id_reservation: 1,
              id_dish: 1,
              paid: false
            }
          ]
        ],
      }
      const req = { cookies: { accessToken: 'validAccessToken' } };
      const findOneSpy = jest.spyOn(reservationsService, 'findOne').mockResolvedValue(reservationFound);
      const createSpy = jest.spyOn(service, 'create').mockResolvedValue(createResult);
      const sendNotificationUpdateSpy = jest.spyOn(service, 'sendNotificationUpdate');
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.create(createOrderedDishDto, req);
      expect(findOneSpy).toHaveBeenCalledWith(createOrderedDishDto[0].id_reservation);
      expect(createSpy).toHaveBeenCalledWith(createOrderedDishDto);
      expect(sendNotificationUpdateSpy).toHaveBeenCalledWith(createOrderedDishDto[0].id_reservation);
    });
  });





  describe('findAllByReservationId', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultOrderedDishDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_ordered_dish: 13,
            id_user: 3,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 2,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 1,
            paid: false,
            removed_ingredients: []
          }
        ]
      };
      const req = { cookies: { accessToken: 'validAccessToken' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(service, 'findAllByReservationId').mockResolvedValue(expectedResult);
      const result = await controller.findAllByReservationId(mockId, req);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByReservationId).toHaveBeenCalledWith(parseInt(mockId));
    });
  });




  describe('findAllByUserId', () => {

    it('should search and return a response with status 200', async () => {
      const mockIdUser = "1";
      const mockIdReservation = "1";
      const expectedResult: ResultOrderedDishDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_ordered_dish: 13,
            id_user: 3,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 2,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 1,
            paid: false,
            removed_ingredients: []
          }
        ]
      };
      const req = { cookies: { accessToken: 'validAccessToken' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(service, 'findAllByUserId').mockResolvedValue(expectedResult);
      const result = await controller.findAllByUserId(mockIdUser, mockIdReservation, req);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByUserId).toHaveBeenCalledWith(parseInt(mockIdUser), parseInt(mockIdUser));
    });
  });




  describe('findAllUnpaidOrders', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultOrderedDishDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_ordered_dish: 13,
            id_user: 3,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 2,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 1,
            paid: false,
            removed_ingredients: []
          }
        ]
      };
      const req = { cookies: { accessToken: 'validAccessToken' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(service, 'findAllUnpaidOrders').mockResolvedValue(expectedResult);
      const result = await controller.findAllUnpaidOrders(mockId, req);
      expect(result).toEqual(expectedResult);
      expect(service.findAllUnpaidOrders).toHaveBeenCalledWith(parseInt(mockId));
    });
  });





  describe('findAllUnpaidOrdersByUserId', () => {

    it('should search and return a response with status 200', async () => {
      const mockIdUser = "1";
      const mockIdReservation = "1";
      const expectedResult: ResultOrderedDishDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_ordered_dish: 13,
            id_user: 3,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 2,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 1,
            paid: false,
            removed_ingredients: []
          }
        ]
      };
      const req = { cookies: { accessToken: 'validAccessToken' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(service, 'findAllUnpaidOrdersByUserId').mockResolvedValue(expectedResult);
      const result = await controller.findAllUnpaidOrdersByUserId(mockIdUser, mockIdReservation, req);
      expect(result).toEqual(expectedResult);
      expect(service.findAllUnpaidOrdersByUserId).toHaveBeenCalledWith(parseInt(mockIdUser), parseInt(mockIdUser));
    });
  });




  describe('findOne', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultOrderedDishDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_ordered_dish: 13,
            id_user: 3,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 2,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 1,
            paid: false,
            removed_ingredients: []
          }
        ]
      };
      const req = { cookies: { accessToken: 'validAccessToken' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      const result = await controller.findOne(mockId, req);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(parseInt(mockId));
    });
  });





  describe('reservationTotalBill', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultOrderedDishDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_ordered_dish: 13,
            id_user: 3,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 2,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 1,
            paid: false,
            removed_ingredients: []
          }
        ]
      };
      const req = { cookies: { accessToken: 'validAccessToken' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(service, 'reservationTotalBill').mockResolvedValue(expectedResult);
      const result = await controller.reservationTotalBill(mockId, req);
      expect(result).toEqual(expectedResult);
      expect(service.reservationTotalBill).toHaveBeenCalledWith(parseInt(mockId));
    });
  });




  describe('userTotalBill', () => {

    it('should search and return a response with status 200', async () => {
      const mockIdUser = "1";
      const mockIdReservation = "1";
      const expectedResult: ResultOrderedDishDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_ordered_dish: 13,
            id_user: 3,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 2,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 1,
            paid: false,
            removed_ingredients: []
          }
        ]
      };
      const req = { cookies: { accessToken: 'validAccessToken' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(service, 'userTotalBill').mockResolvedValue(expectedResult);
      const result = await controller.userTotalBill(mockIdUser, mockIdReservation, req);
      expect(result).toEqual(expectedResult);
      expect(service.userTotalBill).toHaveBeenCalledWith(parseInt(mockIdUser), parseInt(mockIdUser));
    });
  });





  describe('remove', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultOrderedDishDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_ordered_dish: 13,
            id_user: 3,
            name_user: "Cliente",
            surname_user: "Abituale",
            id_reservation: 2,
            id_dish: 1,
            name_dish: "test",
            image_dish: "asd",
            price_dish: 1,
            paid: false,
            removed_ingredients: []
          }
        ]
      };
      const req = { cookies: { accessToken: 'validAccessToken' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(service, 'removeById').mockResolvedValue(expectedResult);
      const result = await controller.remove(mockId, req);
      expect(result).toEqual(expectedResult);
      expect(service.removeById).toHaveBeenCalledWith(parseInt(mockId));
    });
  });

});
