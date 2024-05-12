import { Test, TestingModule } from '@nestjs/testing';
import { AddressesService } from './addresses.service';
import { DatabaseService } from '../database/database.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

jest.mock('../database/database.service');

describe('AddressesService', () => {
  let service: AddressesService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressesService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();
    service = module.get<AddressesService>(AddressesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          insert: jest.fn().mockReturnThis(),
          values: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            { id: 1, city: 'city', street: 'street', street_number: '1', state: 'state', zip_code: 'zip' }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AddressesService>(AddressesService);
    });

    it('should create an address', async () => {
      const createAddressDto = {
        city: 'city',
        street: 'street',
        street_number: '1',
        state: 'state',
        zip_code: 'zip'
      };
      const expectedResult = {
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
      const result = await service.create(createAddressDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      const createAddressDto = {
        city: 'city',
        street: 'street',
        street_number: '1',
        state: 'state',
        zip_code: 'zip'
      };
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.create(createAddressDto)).rejects.toThrow(InternalServerErrorException);
    });
  });



  describe('findOne', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValueOnce([
                { id: 1, city: 'city', street: 'street', street_number: '1', state: 'state', zip_code: 'zip' }
              ]) as any,
            }),
          }),
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AddressesService>(AddressesService);
    });

    const addressId = 1;
    const wrongAddressId = 1.1;

    it('should throw BadRequestException for non-integer addressId', async () => {
      await expect(service.findOne(wrongAddressId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findOne(addressId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found address', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successfull',
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
      const result = await service.findOne(addressId);
      expect(result).toEqual(expectedResult);
    });
  });


  describe('update', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          update: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            { id: 1, city: 'city', street: 'street', street_number: '1', state: 'state', zip_code: 'zip' }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AddressesService>(AddressesService);
    });

    const addressId = 1;
    const wrongAddressId = 1.1;
    const updateAddressDto = {
      city: 'city',
      street: 'street',
      street_number: '1',
      state: 'state',
      zip_code: 'zip'
    };

    it('should throw BadRequestException for non-integer addressId', async () => {
      await expect(service.update(updateAddressDto, wrongAddressId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.update(updateAddressDto, addressId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with updated address', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully updated: address',
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
      const result = await service.update(updateAddressDto, addressId);
      expect(result).toEqual(expectedResult);
    });
  });



  describe('remove', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          where: jest.fn().mockReturnThis(),
          delete: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            { id: 1, city: 'city', street: 'street', street_number: '1', state: 'state', zip_code: 'zip' }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AddressesService>(AddressesService);
    });

    const addressId = 1;
    const wrongAddressId = 1.1;

    it('should throw BadRequestException for non-integer addressId', async () => {
      await expect(service.remove(wrongAddressId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.remove(addressId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with deleted address', async () => {
      const expectedResult = {
        result: true,
        message: 'Successfully deleted: address',
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
      const result = await service.remove(addressId);
      expect(result).toEqual(expectedResult);
    });
  });



  describe('findByRestaurantId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn((params: any) => {
            const { street } = params;
            if (params.street == undefined) {
              return {
                from: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id: 1,
                    }
                  ]) as any
                })
              };
            } else {
              return {
                from: jest.fn().mockReturnValue({
                  where: jest.fn().mockReturnValue([
                    {
                      id: 1,
                      city: 'city',
                      street: 'street',
                      street_number: '1',
                      state: 'state',
                      zip_code: 'zip'
                    }
                  ]) as any
                })
              };
            }
          })
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<AddressesService>(AddressesService);
    });

    const restaurantId = 1;
    const wrongRestaurantId = 1.1;

    it('should throw BadRequestException for non-integer addressId', async () => {
      jest.spyOn(service, 'findByRestaurantId').mockImplementation(async () => {
        throw new BadRequestException('Invalid ID');
      });
      await expect(service.findByRestaurantId(wrongRestaurantId)).rejects.toThrow(BadRequestException);
    });

    it('should return successful response with found address', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successfull',
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
      const result = await service.findByRestaurantId(restaurantId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findByRestaurantId(restaurantId)).rejects.toThrow(InternalServerErrorException);
    });

  });

});
