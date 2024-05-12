import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationService } from './authorization.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '../authentication/dto/user-data.dto';
import { ForbiddenException, InternalServerErrorException } from '@nestjs/common';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let jwtServiceMock: JwtService; 
  const jwtServiceMockResult = {
    id: 1,
    role: UserType.user
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorizationService,
        { provide: JwtService, useValue: { verify: jest.fn().mockReturnValue(jwtServiceMockResult) } },
      ],
    }).compile();
    service = module.get<AuthorizationService>(AuthorizationService);
    jwtServiceMock = module.get<JwtService>(JwtService); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('verifyTokenAndRole', () => {
    const mockedData = 'accessToken';

    it('should create data', async () => {
      const expectedResult = {
        id: 1,
        role: UserType.user
      }
      const result = await service.verifyTokenAndRole(mockedData);
      expect(result).toEqual(expectedResult);
      expect(jwtServiceMock.verify).toHaveBeenCalledWith(mockedData);
    });

    it('should have the wrong role', async () => {
      expect(() => service.verifyTokenAndRole(mockedData, UserType.restaurant)).toThrow(ForbiddenException);
    });

  });


  describe('isAuthorized', () => {
    const mockedData = 'accessToken';
    const mockResolvedValue = {
      id: 1,
      role: UserType.user
    }
    it('should create data', () => {
      const expectedResult = {
        token: {
          id: 1,
          role: UserType.user
        }
      }
      jest.spyOn(service, 'verifyTokenAndRole').mockImplementation(() => {
        return mockResolvedValue
      });
      const result = service.isAuthorized(mockedData);
      expect(result).toEqual(expectedResult);
      expect(service.verifyTokenAndRole).toHaveBeenCalledWith(mockedData, undefined);
    });
  });
});
