import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { UserType } from '../authentication/dto/user-data.dto';
import { DatabaseService } from '../database/database.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';


describe('ReviewsController', () => {
  let controller: ReviewsController;
  let module: TestingModule;
  let reviewsService: ReviewsService;
  let authorizationService: AuthorizationService;
  let databaseService: DatabaseService;
  let configService: ConfigService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [
        ReviewsService,
        AuthorizationService,
        DatabaseService,
        JwtService,
        ConfigService
      ],
    }).compile();

    controller = module.get<ReviewsController>(ReviewsController);
    reviewsService = module.get<ReviewsService>(ReviewsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
    configService = module.get<ConfigService>(ConfigService);
    databaseService = module.get<DatabaseService>(DatabaseService);
  });



  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a review', async () => {
      const createReviewDto: CreateReviewDto = {
        id_restaurant: 1,
        id_user: 1,
        date: new Date('2024-04-17T14:30:00.000Z'),
        score: 3,
        description: 'Descrizione'
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };

      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(reviewsService, 'create').mockResolvedValueOnce(
        {
          result: true,
          message: "Successfully created",
          data: [
            {
              id_restaurant: 1,
              id_user: 1,
              date: new Date('2024-04-17T14:30:00.000Z'),
              score: 3,
              description: "Descrizione"
            }
          ]
        }
      );

      expect(await controller.create(createReviewDto, req)).toEqual({
        result: true,
        message: "Successfully created",
        data: [
          {
            id_restaurant: 1,
            id_user: 1,
            date: new Date('2024-04-17T14:30:00.000Z'),
            score: 3,
            description: "Descrizione"
          }
        ]
      });
    });
  });



  /*
    describe('findAllByRestaurantId', () => {
      it('should find all reviews by restaurant id', async () => {
        const restaurantId = 'mockId';
  
        jest.spyOn(reviewsService, 'findAllByRestaurantId').mockResolvedValueOnce( );
  
        expect(await controller.findAllByRestaurantId(restaurantId)).toEqual( );
      });
    });
  
    describe('findAllByUserId', () => {
      it('should find all reviews by user id', async () => {
        const req = { cookies: { accessToken: 'mockAccessToken' } };
  
        jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 'mockUserId' } });
        jest.spyOn(reviewsService, 'findAllByUserId').mockResolvedValueOnce( );
  
        expect(await controller.findAllByUserId(req)).toEqual( );
      });
    });
  
    describe('update', () => {
      it('should update a review', async () => {
        const reviewId = 'mockId';
        const updateReviewDto: UpdateReviewDto = {  };
        const req = { cookies: { accessToken: 'mockAccessToken' } };
  
        jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 'mockUserId' } });
        jest.spyOn(reviewsService, 'update').mockResolvedValueOnce( );
  
        expect(await controller.update(reviewId, updateReviewDto, req)).toEqual( );
      });
    });
  
    describe('remove', () => {
      it('should remove a review', async () => {
        const reviewId = 'mockId';
        const req = { cookies: { accessToken: 'mockAccessToken' } };
  
        jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 'mockUserId' } });
        jest.spyOn(reviewsService, 'remove').mockResolvedValueOnce( );
  
        expect(await controller.remove(reviewId, req)).toEqual( );
      });
    });
    */


  afterAll(async () => {
    await databaseService.closeConnection();
    await module.close();
  });
});
