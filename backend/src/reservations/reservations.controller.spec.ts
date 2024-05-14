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
  let service: ReservationsService;
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
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1, role: UserType.user } });
      const result = await controller.create(createDto, mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });





  describe('findAllByRestaurantId', () => {
    const mockId = "1";
    const expectedResult = {
      result: true,
      message: "Successfully created",
      data: {
        id: 13,
        id_restaurant: 1,
        date: "2024-04-05T08:30:00.000Z",
        partecipants: 12,
        reservation_state: "In attesa",
        bill_splitting_method: "Equidiviso",
        paid_orders: 0
      }
    }
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };

    it('should find all notifications by user', async () => {
      jest.spyOn(service, 'findAllByRestaurantId').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1, role: UserType.user } });
      const result = await controller.findAllByRestaurantId(mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByRestaurantId).toHaveBeenCalledWith(parseInt(mockId));
    });

  });






  describe('findOne', () => {
    const mockId = "1";
    const expectedResult = {
      result: true,
      message: "Successfully created",
      data: {
        id: 13,
        id_restaurant: 1,
        date: "2024-04-05T08:30:00.000Z",
        partecipants: 12,
        reservation_state: "In attesa",
        bill_splitting_method: "Equidiviso",
        paid_orders: 0
      }
    }
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };

    it('should find all notifications by user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1, role: UserType.user } });
      const result = await controller.findOne(mockId, mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(parseInt(mockId));
    });

  });






  describe('update', () => {
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const updateDto = {
      partecipants: 12,
      reservation_state: "In attesa",
      bill_splitting_method: "Equidiviso"
    }
    const expectedResult = {
      result: true,
      message: "Successfully updated",
      data: {
        id: 13,
        id_restaurant: 1,
        date: "2024-04-05T08:30:00.000Z",
        partecipants: 12,
        reservation_state: "In attesa",
        bill_splitting_method: "Equidiviso",
        paid_orders: 0
      }
    }
    const mockId = "1";

    it('should update the notification', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.update(mockId, updateDto, mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(parseInt(mockId), updateDto);
    });

  });





  describe('remove', () => {
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const expectedResult = {
      result: true,
      message: "Successfully updated",
      data: {
        id: 13,
        id_restaurant: 1,
        date: "2024-04-05T08:30:00.000Z",
        partecipants: 12,
        reservation_state: "In attesa",
        bill_splitting_method: "Equidiviso",
        paid_orders: 0
      }
    }
    const mockId = "1";

    it('should remove the notification', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.remove(mockId, mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(parseInt(mockId));
    });

  });
});
