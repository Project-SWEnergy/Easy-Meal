import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { UserType } from '../authentication/dto/user-data.dto';
import { ResultUserDto } from './dto/result-user.dto';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthenticationService } from '../authentication/authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResultAuthenticationDto } from '../authentication/dto/result-authentication-user.dto';
import { Response } from 'express';
import { InternalServerErrorException } from '@nestjs/common';

jest.mock('../database/database.service');

describe('UsersController', () => {
  let controller: UsersController;
  let module: TestingModule;
  let usersService: UsersService;
  let authorizationService: AuthorizationService;
  let authenticationService: AuthenticationService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        AuthorizationService,
        DatabaseService,
        JwtService,
        ConfigService,
        AuthenticationService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
    authenticationService = module.get<AuthenticationService>(AuthenticationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user and return a response with status 200', async () => {
      const createUserDto: CreateUserDto = {
        name: 'name',
        surname: 'surname',
        email: 'email@email.it',
        password: 'password'
      };
      const mockResult: ResultUserDto =
      {
        result: true,
        message: 'Successfully created: user',
        data: [
          {
            id: 1,
            name: 'test',
            surname: 'surname',
            email: 'example@example.com',
            password: 'password'
          }]
      };
      const mockAuthenticationData: ResultAuthenticationDto =
      {
        result: true,
        message: 'User authenticated',
        user: {
          id: 1,
          role: UserType.user
        }
      }
      const mockAccessToken = 'mockAccessToken';

      jest.spyOn(usersService, 'create').mockResolvedValueOnce(mockResult);
      jest.spyOn(authenticationService, 'signinUser').mockResolvedValueOnce(mockAuthenticationData);
      jest.spyOn(authenticationService, 'generateAccessToken').mockResolvedValueOnce(mockAccessToken);

      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      } as unknown as Response;

      await controller.create(createUserDto, mockResponse);

      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(authenticationService.signinUser).toHaveBeenCalledWith({ email: 'example@example.com', password: 'password' });
      expect(authenticationService.generateAccessToken).toHaveBeenCalledWith({ id: 1, role: 'user' });
      expect(mockResponse.cookie).toHaveBeenCalledWith('accessToken', mockAccessToken, { httpOnly: true });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockResult);
    });

    it('should throw an InternalServerErrorException if creation fails', async () => {
      const createUserDto: CreateUserDto = {
        name: 'name',
        surname: 'surname',
        email: 'test@test.it',
        password: 'password'
      };
      const mockResult: ResultUserDto = {
        result: false,
        message: 'Creation failed',
        data: []
      };

      jest.spyOn(usersService, 'create').mockResolvedValueOnce(mockResult);

      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      } as unknown as Response;

      await expect(controller.create(createUserDto, mockResponse)).rejects.toThrow(
        new InternalServerErrorException('Creation failed'));

      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });

    it('should throw an InternalServerErrorException if authentication fails', async () => {

      const createUserDto: CreateUserDto = {
        name: 'name',
        surname: 'surname',
        email: 'email@email.it',
        password: 'password'
      };
      const mockResult: ResultUserDto = {
        result: true,
        message: 'Successfully created: user',
        data: [
          {
            id: 1,
            name: 'test',
            surname: 'surname',
            email: 'example@example.com',
            password: 'password'
          }
        ]
      };
      const mockAuthenticationData: ResultAuthenticationDto = {
        result: false,
        message: 'Authentication failed',
        user: null
      };


      jest.spyOn(usersService, 'create').mockResolvedValueOnce(mockResult);

      jest.spyOn(authenticationService, 'signinUser').mockResolvedValueOnce(mockAuthenticationData);

      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      } as unknown as Response;


      await expect(controller.create(createUserDto, mockResponse)).rejects.toThrow(
        new InternalServerErrorException('Authentication failed'));


      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(authenticationService.signinUser).toHaveBeenCalledWith({
        email: 'example@example.com',
        password: 'password'
      });

      expect(mockResponse.cookie).not.toHaveBeenCalled();

      expect(mockResponse.status).not.toHaveBeenCalled();

      expect(mockResponse.json).not.toHaveBeenCalled();
    });


    it('should throw an InternalServerErrorException if unexpected error occurs during cookie setting', async () => {

      const createUserDto: CreateUserDto = {
        name: 'name',
        surname: 'surname',
        email: 'email@email.it',
        password: 'password'
      };
      const mockResult: ResultUserDto = {
        result: true,
        message: 'Successfully created: user',
        data: [
          {
            id: 1,
            name: 'test',
            surname: 'surname',
            email: 'example@example.com',
            password: 'password'
          }
        ]
      };
      const mockAuthenticationData: ResultAuthenticationDto = {
        result: true,
        message: 'User authenticated',
        user: {
          id: 1,
          role: UserType.user
        }
      };
      const mockAccessToken = 'mockAccessToken';


      jest.spyOn(usersService, 'create').mockResolvedValueOnce(mockResult);

      jest.spyOn(authenticationService, 'signinUser').mockResolvedValueOnce(mockAuthenticationData);

      jest.spyOn(authenticationService, 'generateAccessToken').mockResolvedValueOnce(mockAccessToken);


      const unexpectedError = new Error('Unexpected error');

      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        cookie: jest.fn(),
      } as unknown as Response;


      jest.spyOn(mockResponse, 'cookie').mockImplementationOnce(() => {
        throw unexpectedError;
      });


      await expect(controller.create(createUserDto, mockResponse as Response)).rejects.toThrow(
        new InternalServerErrorException('Unexpected error'));


      expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      expect(authenticationService.signinUser).toHaveBeenCalledWith({
        email: 'example@example.com',
        password: 'password'
      });
      expect(authenticationService.generateAccessToken).toHaveBeenCalledWith({
        id: 1,
        role: 'user'
      });

      expect(mockResponse.cookie).toHaveBeenCalledWith('accessToken', mockAccessToken, { httpOnly: true });

      expect(mockResponse.status).not.toHaveBeenCalled();

      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the user data if authorized', async () => {
      const req = {
        cookies: {
          accessToken
            : 'mockAccessToken'
        }
      };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce({
        token: { id: 1 }
      });
      const mockUserData: ResultUserDto = {
        result: true,
        message: "Works!",
        data: []
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValueOnce(mockUserData);
      const result = await controller.findOne(req);
      expect(result).toEqual(mockUserData);
      expect(authorizationService.isAuthorized).toHaveBeenCalledWith('mockAccessToken', UserType.user);
      expect(usersService.findOne).toHaveBeenCalledWith(1);
    }
    );
  });

  describe ('update', () => {
    it('should update the user data if authorized', async () => {
      const req = {
        cookies: {
          accessToken: 'mockAccessToken'
        }
      };
      jest.spyOn(authorizationService , 'isAuthorized').mockReturnValueOnce({
        token: { id: 1 }
      });
      const mockUserData: ResultUserDto = {
        result: true,
        message: "Works!",
        data: [
          {
            id: 1,
            name: 'name',
            surname: 'surname',
            email: 'email',
            password: 'password'
          }
        ]
      };
      const updateUserDto = {
        name: 'modiefiedName',
        surname: 'modifiedSurname',
        email: 'modefiedEmail',
        password: 'modefiedPassword'
      };
      jest.spyOn(usersService, 'update').mockResolvedValueOnce(mockUserData);
      const result = await controller.update(updateUserDto, req);
      expect(result).toEqual(mockUserData);
      expect(authorizationService.isAuthorized).toHaveBeenCalledWith('mockAccessToken', UserType.user);
      expect(usersService.update).toHaveBeenCalledWith(updateUserDto, 1);
    }
    );
  } );

  describe ('remove', () => {
    it('should remove the user data if authorized', async () => {
      const req = {
        cookies: {
          accessToken: 'mockAccessToken'
        }
      };
      jest.spyOn(authorizationService , 'isAuthorized').mockReturnValueOnce({
        token: { id: 1 }
      });
      const mockUserData: ResultUserDto = {
        result: true,
        message: "Works!",
        data: [
          {
            id: 1,
            name: 'name',
            surname: 'surname',
            email: 'email',
            password: 'password'
          }
        ]
      };
      jest.spyOn(usersService, 'remove').mockResolvedValueOnce(mockUserData);
      const result = await controller.remove(req);
      expect(result).toEqual(mockUserData);
      expect(authorizationService.isAuthorized).toHaveBeenCalledWith('mockAccessToken', UserType.user);
      expect(usersService.remove).toHaveBeenCalledWith(1);
    } );


});


}); 
