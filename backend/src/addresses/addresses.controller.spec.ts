import { Test, TestingModule } from '@nestjs/testing';
import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';
import { AuthorizationService } from '../authorization/authorization.service'; // Assicurati di importare correttamente AuthorizationService
import { CreateAddressDto } from './dto/create-address.dto';
import { ResultAddressDto } from './dto/result-address.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateAddressDto } from './dto/update-address.dto';

jest.mock('../database/database.service');
jest.mock('./addresses.service');
jest.mock('../authentication/authentication.service');
jest.mock('../authorization/authorization.service');

describe('AddressesController', () => {
  let controller: AddressesController;
  let addressesService: AddressesService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddressesController],
      providers: [AddressesService, AuthorizationService, JwtService],
    }).compile();
    controller = module.get<AddressesController>(AddressesController);
    addressesService = module.get<AddressesService>(AddressesService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {

    it('should create a new address and return a response with status 200', async () => {
      // Arrange
      const createAddressDto: CreateAddressDto = {
        city: 'city',
        street: 'street',
        street_number: '1',
        state: 'state',
        zip_code: 'zip'
      };
      const expectedResult: ResultAddressDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            city: 'city',
            street: 'street',
            street_number: '1',
            state: 'state',
            zip_code: 'zip'
          }
        ]
      };
      jest.spyOn(addressesService, 'create').mockResolvedValue(expectedResult);
      const result = await controller.create(createAddressDto);
      expect(result).toEqual(expectedResult);
      expect(addressesService.create).toHaveBeenCalledWith(createAddressDto);
    });
  });

  describe('findOne', () => {

    it('should return the address with status 200 if authorized', async () => {
      const mockAccessToken = 'mockedAccessToken';
      const mockAuth = { token: { id: 'mockedUserId' } };
      const mockResult: ResultAddressDto = {
        result: true,
        message: 'Mocked address found',
        data: [{
          id: 1,
          city: 'mockedCity',
          street: 'mockedStreet',
          street_number: '1',
          state: 'mockedState',
          zip_code: 'mockedZip'
        }]
      };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      jest.spyOn(addressesService, 'findOne').mockResolvedValueOnce(mockResult);
      const result = await controller.findOne({ cookies: { accessToken: mockAccessToken } });
      expect(result).toEqual(mockResult);
      expect(authorizationService.isAuthorized).toHaveBeenCalledWith(mockAccessToken);
      expect(addressesService.findOne).toHaveBeenCalledWith(mockAuth.token.id);
    });
  });

  describe('findByRestaurantId', () => {

    it('should return addresses with status 200 for the given restaurant ID', async () => {
      const mockRestaurantId = '1';
      const mockResult: ResultAddressDto = {
        result: true,
        message: 'Mocked addresses found',
        data: [
          {
            id: 1,
            city: 'mockedCity',
            street: 'mockedStreet',
            street_number: '1',
            state: 'mockedState',
            zip_code: 'mockedZip'
          },
          {
            id: 2,
            city: 'mockedCity2',
            street: 'mockedStreet2',
            street_number: '2',
            state: 'mockedState2',
            zip_code: 'mockedZip2'
          }
        ]
      };
      jest.spyOn(addressesService, 'findByRestaurantId').mockResolvedValueOnce(mockResult);
      const result = await controller.findByRestaurantId(mockRestaurantId);
      expect(result).toEqual(mockResult);
      expect(addressesService.findByRestaurantId).toHaveBeenCalledWith(parseInt(mockRestaurantId));
    });
  });

  describe('update', () => {

    it('should update the address and return a response with status 200 if authorized', async () => {
      const mockUpdateAddressDto: UpdateAddressDto = {
        city: 'updatedCity',
        street: 'updatedStreet',
        street_number: '2',
        state: 'updatedState',
        zip_code: 'updatedZip'
      };
      const mockAccessToken = 'mockedAccessToken';
      const mockAuth = { token: { id: 'mockedUserId' } };
      const mockResult: ResultAddressDto = {
        result: true,
        message: 'Mocked address updated',
        data: [{
          id: 1,
          city: 'updatedCity',
          street: 'updatedStreet',
          street_number: '2',
          state: 'updatedState',
          zip_code: 'updatedZip'
        }]
      };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      jest.spyOn(addressesService, 'update').mockResolvedValueOnce(mockResult);
      const result = await controller.update(mockUpdateAddressDto, { cookies: { accessToken: mockAccessToken } });
      expect(result).toEqual(mockResult);
      expect(authorizationService.isAuthorized).toHaveBeenCalledWith(mockAccessToken);
      expect(addressesService.update).toHaveBeenCalledWith(mockUpdateAddressDto, mockAuth.token.id);
    });

  });

  describe('remove', () => {

    it('should remove the address and return a response with status 200 if authorized', async () => {
      const mockAccessToken = 'mockedAccessToken';
      const mockAuth = { token: { id: 'mockedUserId' } };
      const mockResult: ResultAddressDto = {
        result: true,
        message: 'Mocked address removed',
        data: [{
          id: 1,
          city: 'mockedCity',
          street: 'mockedStreet',
          street_number: '1',
          state: 'mockedState',
          zip_code: 'mockedZip'
        }]
      };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce(mockAuth);
      jest.spyOn(addressesService, 'remove').mockResolvedValueOnce(mockResult);
      const result = await controller.remove({ cookies: { accessToken: mockAccessToken } });
      expect(result).toEqual(mockResult);
      expect(authorizationService.isAuthorized).toHaveBeenCalledWith(mockAccessToken);
      expect(addressesService.remove).toHaveBeenCalledWith(mockAuth.token.id);
    });

  });
}
);
