import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';


jest.mock('../authorization/authorization.service');
jest.mock('../authentication/authentication.service');
jest.mock('./notifications.service');


describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [NotificationsService, AuthorizationService],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('findAllByUserIdAndRole', () => {
    const mockId = 1;
    const mockRole = UserType.user;
    const expectedResult = {
      result: true,
      message: "Successfully created",
      data: {
        id: 1,
        title: 'title',
        message: 'message',
        id_receiver: 1,
        role: UserType.user,
        visualized: false
      }
    }
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };

    it('should find all notifications by user', async () => {
      jest.spyOn(service, 'findAllByUserIdAndRole').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1, role: UserType.user } });
      const result = await controller.findAllByUserIdAndRole(mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByUserIdAndRole).toHaveBeenCalledWith(mockId, mockRole);
    });

  });


  describe('update', () => {
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const mockIdNotification = "1";
    const mockWrongIdNotification = "abcd";
    const expectedResult = {
      result: true,
      message: "Successfully updated",
      data: {
        id: 1,
        title: 'title',
        message: 'message',
        id_receiver: 1,
        role: UserType.user,
        visualized: true
      }
    }

    it('should update the notification', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.update(mockIdNotification, mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(parseInt(mockIdNotification));
    });

    it('should throw BadRequest caused by wrong role', async () => {
      await expect(controller.update(mockWrongIdNotification, mockRequest)).rejects.toThrow(BadRequestException);
    });

  });

});
