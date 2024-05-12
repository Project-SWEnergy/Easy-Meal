import { Test, TestingModule } from '@nestjs/testing';
import { OpeningHoursController } from './opening-hours.controller';
import { OpeningHoursService } from './opening-hours.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { CreateOpeningHoursDto } from './dto/create-opening-hours.dto';
import { ResultOpeningHoursDto } from './dto/result-opening-hours.dto';
import { UpdateOpeningHoursDto } from './dto/update-opening-hours.dto';

jest.mock('../authorization/authorization.service');
jest.mock('../authentication/authentication.service');
jest.mock('./opening-hours.service');

describe('OpeningHoursController', () => {
  let controller: OpeningHoursController;
  let service: OpeningHoursService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
      ],
      controllers: [OpeningHoursController],
      providers: [OpeningHoursService],
    }).compile();

    controller = module.get<OpeningHoursController>(OpeningHoursController);
    service = module.get<OpeningHoursService>(OpeningHoursService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });




  describe('create', () => {

    it('should create and return a response with status 200', async () => {
      const createDto: CreateOpeningHoursDto[] = [
        {
          id_day: 1,
          id_restaurant: 1,
          opening_time: "09:00:00",
          closing_time: "12:00:00"
        }
      ];
      const expectedResult: ResultOpeningHoursDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            id_day: 1,
            name_day: "String",
            abbreviation_day: "String",
            order_day: "String",
            opening_time: "String",
            closing_time: "String"
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.create(createDto, req);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });



  describe('findAllByRestaurantId', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultOpeningHoursDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            id_day: 1,
            name_day: "String",
            abbreviation_day: "String",
            order_day: "String",
            opening_time: "String",
            closing_time: "String"
          }
        ]
      };
      jest.spyOn(service, 'findAllByRestaurantId').mockResolvedValue(expectedResult);
      const result = await controller.findAllByRestaurantId(mockId);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByRestaurantId).toHaveBeenCalledWith(parseInt(mockId));
    });
  });





  describe('findOne', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultOpeningHoursDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            id_day: 1,
            name_day: "String",
            abbreviation_day: "String",
            order_day: "String",
            opening_time: "String",
            closing_time: "String"
          }
        ]
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      const result = await controller.findOne(mockId);
      expect(result).toEqual(expectedResult);
      expect(service.findOne).toHaveBeenCalledWith(parseInt(mockId));
    });
  });





  describe('update', () => {

    it('should update and return a response with status 200', async () => {
      const mockId = "1";
      const updateDto: UpdateOpeningHoursDto = {
        opening_time: "String",
        closing_time: "String"
      };
      const expectedResult: ResultOpeningHoursDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            id_day: 1,
            name_day: "String",
            abbreviation_day: "String",
            order_day: "String",
            opening_time: "String",
            closing_time: "String"
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.update(mockId, updateDto, req);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(parseInt(mockId), updateDto);
    });
  });





  describe('remove', () => {

    it('should remove and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultOpeningHoursDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            id_day: 1,
            name_day: "String",
            abbreviation_day: "String",
            order_day: "String",
            opening_time: "String",
            closing_time: "String"
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.remove(mockId, req);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(parseInt(mockId));
    });
  });


});
