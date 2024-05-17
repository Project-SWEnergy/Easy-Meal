import { Test, TestingModule } from '@nestjs/testing';
import { UsersAllergiesController } from './users-allergies.controller';
import { UsersAllergiesService } from './users-allergies.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { DatabaseService } from '../database/database.service';
import { CreateUsersAllergyDto } from './dto/create-users-allergy.dto';
import { ResultUserAllergiesDto } from './dto/result-users-allergy.dto';
import { JwtService } from '@nestjs/jwt';

jest.mock('../database/database.service');
jest.mock('../authentication/authentication.service');
jest.mock('../authorization/authorization.service');


describe('UsersAllergiesController', () => {
  let controller: UsersAllergiesController;
  let authorizationService: AuthorizationService;
  let service: UsersAllergiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersAllergiesController],
      providers: [UsersAllergiesService, AuthorizationService, DatabaseService, JwtService],
    }).compile();

    controller = module.get<UsersAllergiesController>(UsersAllergiesController);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
    service = module.get<UsersAllergiesService>(UsersAllergiesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a response with status 200', async () => {
      const createUsersAllergyDto: CreateUsersAllergyDto = {
        allergyId: [1],
      };
      const expectedResult: ResultUserAllergiesDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            userId: 1,
            allergyId: 1,
            allergyName: 'mockAllergyName',

          }
        ]
      };
      /*const req = { cookies: { accessToken: 'mockAccessToken' } } as any;
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.create(createUsersAllergyDto, req);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createUsersAllergyDto);*/

      const req = { cookies: { accessToken: 'mockAccessToken' } } as any;
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.create(createUsersAllergyDto, req);
      expect(result).toEqual(expectedResult);
      //expect(service.create).toHaveBeenCalledWith(createUsersAllergyDto);
    });
  });

  describe('findAllByUser', () => {
    it('should return a response with status 200', async () => {
      const expectedResult: ResultUserAllergiesDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            userId: 1,
            allergyId: 1,
            allergyName: 'mockAllergyName',

          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } } as any;
      jest.spyOn(service, 'findAllByUser').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.findAllByUser(req);
      expect(result).toEqual(expectedResult);
      expect(service.findAllByUser).toHaveBeenCalledWith(1);
    });
  });

  describe('findOneByUser', () => {
    it('should return a response with status 200', async () => {
      const expectedResult: ResultUserAllergiesDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            userId: 1,
            allergyId: 1,
            allergyName: 'mockAllergyName',

          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } } as any;
      jest.spyOn(service, 'findOneByUser').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.findOneByUser('1', req);
      expect(result).toEqual(expectedResult);
      expect(service.findOneByUser).toHaveBeenCalledWith(1, 1);
    });

    it('should throw an error if the allergy ID is not an integer', async () => {
      const req = {
        cookies: {
          accessToken
            : ' mockAccessToken'
        }
      } as any;
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      await expect(controller.findOneByUser('mockId', req)).rejects.toThrowError('Invalid allergy ID');

    });
  });

  describe('update', () => {
    it('should return a response with status 200', async () => {
      const createUsersAllergyDto: CreateUsersAllergyDto = {
        allergyId: [1],
      };
      const expectedResult: ResultUserAllergiesDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            userId: 1,
            allergyId: 1,
            allergyName: 'mockAllergyName',

          }
        ]
      };
      const req = {
        cookies: {
          accessToken
            : ' mockAccessToken'
        }
      } as any;
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.update(createUsersAllergyDto, req);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(1, createUsersAllergyDto);
    }
    );
  });
});
