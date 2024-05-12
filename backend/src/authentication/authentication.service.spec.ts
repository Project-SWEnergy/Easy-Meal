import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { DatabaseService } from '../database/database.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { expect, jest } from '@jest/globals';
import { UserType } from './dto/user-data.dto';
import * as argon from 'argon2';


jest.mock('../database/database.service');
jest.mock('../authorization/authorization.service');
jest.mock('@nestjs/config')
jest.mock('argon2')

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let databaseServiceMock: Partial<DatabaseService>;
  let jwtServiceMock: JwtService;
  let configServiceMock: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthenticationService,
        { provide: JwtService, useValue: { signAsync: jest.fn().mockReturnValue('string') } },
        { provide: DatabaseService, useValue: databaseServiceMock },
        { provide: ConfigService, useValue: { get: jest.fn().mockReturnValue('string') } }
      ],
    }).compile();
    service = module.get<AuthenticationService>(AuthenticationService);
    jwtServiceMock = module.get<JwtService>(JwtService);
    configServiceMock = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('generateAccessToken', () => {
    const mockUserData = {
      email: 'email',
      password: 'password'
    };

    it('should throw InternalServerErrorException if token generation fails', async () => {
      (jwtServiceMock.signAsync as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      const userData = { id: 1, username: 'test_user' };
      await expect(service.generateAccessToken(userData)).rejects.toThrow(InternalServerErrorException);
    });

    it('should generate an access token', async () => {
      const expectedResult = 'string';
      const result = await service.generateAccessToken(mockUserData);
      expect(result).toEqual(expectedResult);
    })

  });



  describe('signinUser', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                {
                  name: 'name',
                  email: 'email',
                  password: 'password',
                  id: 1,
                  surname: 'surname'
                }
              ]) as any
            })
          })
        })
        ) as () => any
      };
    });

    const mockUserData = {
      email: 'email',
      password: 'password'
    };
    const expectedResult = {
      result: true,
      message: "User authenticated",
      user: {
        id: 1,
        role: UserType.user
      }
    }
    const expectedWrongPassword = {
      result: false,
      message: 'Credentials incorrect',
      user: null
  }

    it('should throw InternalServerErrorException on database error', async () => {
      jest.spyOn(service, 'signinUser').mockImplementation(async () => {
        throw new InternalServerErrorException('Invalid ID');
      });
      await expect(service.signinUser(mockUserData)).rejects.toThrow(InternalServerErrorException);
    });

    it('should not match the password', async () => {
      (argon.verify as jest.Mock).mockImplementation(() => {
        return false;
      });
      const result = await service.signinUser(mockUserData);
      expect(result).toEqual(expectedWrongPassword);
    })

    it('should sign in a user', async () => {
      (argon.verify as jest.Mock).mockImplementation(() => {
        return true;
      });
      const result = await service.signinUser(mockUserData);
      expect(result).toEqual(expectedResult);
    })
  });


  describe('signinRestaurant', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                {
                  password: 'password',
                  id: 1,
                }
              ]) as any
            })
          })
        })
        ) as () => any
      };
    });

    const mockUserData = {
      email: 'email',
      password: 'password'
    };
    const expectedResult = {
      result: true,
      message: "Restaurant authenticated",
      user: {
        id: 1,
        role: UserType.restaurant
      }
    }
    const expectedWrongPassword = {
      result: false,
      message: 'Credentials incorrect',
      user: null
  }

    it('should throw InternalServerErrorException on database error', async () => {
      jest.spyOn(service, 'signinRestaurant').mockImplementation(async () => {
        throw new InternalServerErrorException('Invalid ID');
      });
      await expect(service.signinRestaurant(mockUserData)).rejects.toThrow(InternalServerErrorException);
    });

    it('should not match the password', async () => {
      (argon.verify as jest.Mock).mockImplementation(() => {
        return false;
      });
      const result = await service.signinRestaurant(mockUserData);
      expect(result).toEqual(expectedWrongPassword);
    })

    it('should sign in a restaurant', async () => {
      (argon.verify as jest.Mock).mockImplementation(() => {
        return true;
      });
      const result = await service.signinRestaurant(mockUserData);
      expect(result).toEqual(expectedResult);
    })
  });

});
