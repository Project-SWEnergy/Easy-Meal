import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationService } from '../authorization/authorization.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from '../authorization/authorization.module';
import { AuthenticationDto } from './dto/authentication.dto';
import { ResultAuthenticationDto } from './dto/result-authentication-user.dto';
import { UserType } from './dto/user-data.dto';
import { Response, Request } from 'express';

jest.mock('../database/database.service');
jest.mock('./authentication.service');
jest.mock('../authorization/authorization.service');

describe('AuthenticationController', () => {
  let controller: AuthenticationController;
  let service: AuthenticationService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        JwtModule.register({}),
        ConfigModule,
        AuthorizationModule
      ],
      providers: [AuthenticationService],
      controllers: [AuthenticationController],
      exports: [AuthenticationService]
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
    service = module.get<AuthenticationService>(AuthenticationService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });




  describe('signinUser', () => {

    const authenticationDto: AuthenticationDto = {
      email: 'email@email.it',
      password: 'password'
    };
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    } as unknown as Response;

    it('should return a response with status 200 and set accessToken cookie', async () => {
      const expectedResult: ResultAuthenticationDto = {
        result: true,
        message: 'Successfully created',
        user: {
          id: 1,
          role: UserType.user
        }
      };
      const mockToken = 'mockedToken';
      jest.spyOn(service, 'signinUser').mockResolvedValue(expectedResult);
      jest.spyOn(service, 'generateAccessToken').mockResolvedValue(mockToken);
      await controller.signinUser(authenticationDto, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(service.signinUser).toHaveBeenCalledWith(authenticationDto);
      expect(service.generateAccessToken).toHaveBeenCalledWith(expectedResult.user);
      expect(mockResponse.cookie).toHaveBeenCalledWith('accessToken', mockToken, { httpOnly: true, });
    });

    it('should throw new Error', async () => {
      const expectedResult = {
        result: false,
        message: 'Successfully created',
        user: {
          id: 1,
          role: UserType.user
        }
      };
      (service.signinUser as jest.Mock).mockImplementation(() => {
        return expectedResult
      });
      await expect(controller.signinUser(authenticationDto, mockResponse)).rejects.toThrow(Error);
    });

  });




  describe('signinRestaurant', () => {
    const authenticationDto: AuthenticationDto = {
      email: 'email@email.it',
      password: 'password'
    };
    const mockResponse: Response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    } as unknown as Response;

    it('should return a response with status 200 and set accessToken cookie', async () => {
      const expectedResult: ResultAuthenticationDto = {
        result: true,
        message: 'Successfully created',
        user: {
          id: 1,
          role: UserType.restaurant
        }
      };
      const mockToken = 'mockedToken';
      jest.spyOn(service, 'signinRestaurant').mockResolvedValue(expectedResult);
      jest.spyOn(service, 'generateAccessToken').mockResolvedValue(mockToken);
      await controller.signinRestaurant(authenticationDto, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(service.signinRestaurant).toHaveBeenCalledWith(authenticationDto);
      expect(service.generateAccessToken).toHaveBeenCalledWith(expectedResult.user);
      expect(mockResponse.cookie).toHaveBeenCalledWith('accessToken', mockToken, {
        httpOnly: true,
      });
    });

    it('should return a response with status 500 and appropriate message if authentication fails', async () => {
      const expectedResult = {
        result: false,
        message: 'Internal server error.'
      };
      (service.signinRestaurant as jest.Mock).mockReturnValue(expectedResult)
      await controller.signinRestaurant(authenticationDto, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(service.signinRestaurant).toHaveBeenCalledWith(authenticationDto);
    });
  });





  describe('signout', () => {
    const mockRequest: Partial<Request> = {
      cookies: {
        accessToken: 'mockAccessToken'
      }
    };
    const mockResponse: Partial<Response> = {
      clearCookie: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    it('should return a response with status 200 and clear accessToken cookie', async () => {
      const mockAuthorization = { token: { id: 1 } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue(mockAuthorization);
      await controller.signout(mockResponse as Response, mockRequest as Request);
      expect(authorizationService.isAuthorized).toHaveBeenCalledWith('mockAccessToken');
      expect(mockResponse.clearCookie).toHaveBeenCalledWith('accessToken');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Logout successful' });
    });
  
    it('should return a response with status 500 if authorization fails', async () => {
      jest.spyOn(authorizationService, 'isAuthorized').mockImplementation(() => {
        throw new Error('Authorization failed');
      });
      await controller.signout(mockResponse as Response, mockRequest as Request);
      expect(authorizationService.isAuthorized).toHaveBeenCalledWith('mockAccessToken');
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Internal server error' });
    });
  });
  



  describe('findDataFromToken', () => {
  // Definisci la richiesta mock
  const mockRequest: Partial<Request> = {
    cookies: {
      accessToken: 'mockAccessToken'
    }
  };

  // Test per il percorso di successo
  it('should return a response with status 200 and data from token if authorized', () => {
    // Mock del risultato dell'autorizzazione
    const mockAuthorization = { token: { id: 1 } };
    // Sovrascrivi l'implementazione del servizio di autorizzazione per restituire il risultato atteso
    jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue(mockAuthorization);
    // Chiamata alla funzione del controller
    const result = controller.findDataFromToken(mockRequest as Request);
    // Assicurati che la funzione del servizio di autorizzazione sia stata chiamata con il token di accesso
    expect(authorizationService.isAuthorized).toHaveBeenCalledWith('mockAccessToken');
    // Assicurati che il risultato contenga i dati corretti
    expect(result).toEqual({
      result: true,
      message: 'Valid token',
      data: [mockAuthorization.token]
    });
  });

  
});



});

