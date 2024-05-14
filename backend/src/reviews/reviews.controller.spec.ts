import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { NotificationsService } from '../notifications/notifications.service';
import { ResultReviewsDto } from './dto/result-review.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { AuthorizationService } from '../authorization/authorization.service';

jest.mock('../database/database.service');
jest.mock('./reviews.service');
jest.mock('../authentication/authentication.service');
jest.mock('../authorization/authorization.service');
jest.mock('../notifications/notifications.service');

describe('ReviewsController', () => {
  let controller: ReviewsController;
  let service: ReviewsService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule
      ],
      controllers: [ReviewsController],
      providers: [ReviewsService, NotificationsService],
    }).compile();
    controller = module.get<ReviewsController>(ReviewsController);
    service = module.get<ReviewsService>(ReviewsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });




  describe('create', () => {

    it('should create a new review and return a response with status 200', async () => {
      const createDto: CreateReviewDto = {
        id_restaurant: 1,
        id_user: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        score: 1,
        description: "string"
      };
      const expectedResult: ResultReviewsDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_restaurant: 1,
            id_user: 1,
            date: new Date("2024-04-05T08:30:00.000Z"),
            score: 1,
            description: "string"
          }
        ]
      };
      const mockIdUser = 1
      const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1, role: UserType.user } });
      const result = await controller.create(createDto, mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(mockIdUser, createDto);
    });
  });


  describe('findAllByRestaurantId', () => {
    const mockId = "1";
    const expectedResult = {
      result: true,
      message: "Successfully created",
      data: {
        id_restaurant: 1,
        id_user: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        score: 1,
        description: "string"
      }
    }

    it('should find all notifications by user', async () => {
      jest.spyOn(service, 'findAllByRestaurantId').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1, role: UserType.user } });
      const result = await controller.findAllByRestaurantId(mockId);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByRestaurantId).toHaveBeenCalledWith(parseInt(mockId));
    });

  });




  describe('findAllByUserId', () => {
    const mockId = "1";
    const expectedResult = {
      result: true,
      message: "Successfully created",
      data: {
        id_restaurant: 1,
        id_user: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        score: 1,
        description: "string"
      }
    }
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };

    it('should find all notifications by user', async () => {
      jest.spyOn(service, 'findAllByUserId').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1, role: UserType.user } });
      const result = await controller.findAllByUserId(mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByUserId).toHaveBeenCalledWith(parseInt(mockId));
    });

  });





  describe('update', () => {
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const updateDto = {
      id_restaurant: 1,
      date: new Date("2024-04-17T14:30:00.000Z"),
      score: 3,
      description: "Descrizione"
    }
    const expectedResult = {
      result: true,
      message: "Successfully updated",
      data: {
        id_restaurant: 1,
        id_user: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        score: 1,
        description: "string"
      }
    }
    const mockId = "1";

    it('should update the notification', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.update(updateDto, mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(parseInt(mockId), parseInt(mockId), updateDto);
    });

  });






  describe('remove', () => {
    const mockRequest = { cookies: { accessToken: 'mockAccessToken' } };
    const expectedResult = {
      result: true,
      message: "Successfully updated",
      data: {
        id_restaurant: 1,
        id_user: 1,
        date: new Date("2024-04-05T08:30:00.000Z"),
        score: 1,
        description: "string"
      }
    }
    const mockId = "1";

    it('should remove the notification', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.remove(mockId, mockRequest);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(parseInt(mockId), parseInt(mockId));
    });

  });
});
