import { Test, TestingModule } from '@nestjs/testing';
import { UsersReservationsController } from './users-reservations.controller';
import { UsersReservationsService } from './users-reservations.service';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationService } from '../authorization/authorization.service';
import { ResultUsersReservationDto } from './dto/result-users-reservation.dto';
import { NotificationsService } from '../notifications/notifications.service';

jest.mock('../database/database.service');
jest.mock('../authorization/authorization.service');

describe('UsersReservationsController', () => {
  let controller: UsersReservationsController;
  let service: UsersReservationsService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersReservationsController],
      providers: [UsersReservationsService, DatabaseService, AuthorizationService, JwtService, NotificationsService],
    }).compile();

    controller = module.get<UsersReservationsController>(UsersReservationsController);
    service = module.get<UsersReservationsService>(UsersReservationsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('create', () => {

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
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.create(createUsersReservationDto, req);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createUsersReservationDto);
    });
  });

  describe('invite', () => {
    it('should invite and return a response with status 200', async () => {
      const inviteUsersDto = {
        email_users: ['mockEmail'],
        id_reservation: 1
      };
      const expectedResult: ResultUsersReservationDto = {
        result: true,
        message: 'Successfully invited',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'invite').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.invite(inviteUsersDto, req);
      expect(result).toEqual(expectedResult);
      expect(service.invite).toHaveBeenCalledWith(inviteUsersDto);
    });


  });

  describe('findAllByUserId', () => {

    it('should return data with status 200 for the given user ID', async () => {
      const mockResult: ResultUsersReservationDto = {
        result: true,
        message: 'Mocked reservations found',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'findAllByUserId').mockResolvedValueOnce(mockResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.findAllByUserId(req);
      expect(result).toEqual(mockResult);
      expect(service.findAllByUserId).toHaveBeenCalledWith(1);
    });
  });

  describe('findAllByReservationId', () => {

    it('should return data with status 200 for the given reservation ID', async () => {
      const mockId = '1';
      const mockResult: ResultUsersReservationDto = {
        result: true,
        message: 'Mocked reservations found',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'findAllByReservationId').mockResolvedValueOnce(mockResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.findAllByReservationId(mockId, req);
      expect(result).toEqual(mockResult);
      expect(service.findAllByReservationId).toHaveBeenCalledWith(1);
    });
  });

  describe('findOne', () => {

    it('should return data with status 200 for the given user ID and reservation ID', async () => {
      const mockIdUser = '1';
      const mockIdReservation = '1';
      const mockResult: ResultUsersReservationDto = {
        result: true,
        message: 'Mocked reservations found',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'findOne').mockResolvedValueOnce(mockResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.findOne(mockIdUser, mockIdReservation, req);
      expect(result).toEqual(mockResult);
      expect(service.findOne).toHaveBeenCalledWith(1, 1);
    });
  });

  describe('update', () => {
    it('should update and return a response with status 200', async () => {
      const updateUsersReservationDto = {
        id_user: 1,
        id_reservation: 1,
        accepted: true
      };
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
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.update(updateUsersReservationDto, '1', req);
      expect(result).toEqual(expectedResult);
      
    });
  });

  describe('remove', () => {
    it('should remove and return a response with status 200', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully removed',
        data: [
          {
            id_user: 1,
            id_reservation: 1,
            accepted: true
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.remove('1', req);
      expect(result).toEqual(expectedResult);
    });
  });
});
