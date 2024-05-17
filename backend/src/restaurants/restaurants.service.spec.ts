import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { DatabaseService } from '../database/database.service';
import { AddressesModule } from '../addresses/addresses.module';
import { AddressesService } from '../addresses/addresses.service';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { UploadFileService } from '../upload-file/upload-file.service';
import { RestaurantsController } from './restaurants.controller';
import { CreateRestaurantAddressDto } from './dto/create-restaurant-address.dto';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';


jest.mock('../database/database.service');

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        AuthenticationModule,
        DatabaseModule,
        AddressesModule
      ],
      controllers: [RestaurantsController],
      providers: [RestaurantsService, AddressesService, UploadFileService],
    }).compile();
    service = module.get<RestaurantsService>(RestaurantsService);
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
            {
              id: 1,
              email: "string",
              name: "string",
              owner_name: "string",
              owner_surname: "string",
              id_address: 1,
              address_city: "string",
              address_street: "string",
              address_street_number: "string",
              address_state: "string",
              address_zip_code: "string",
              seats: 1,
              price_tier: 1,
              description: "string",
              phone: "string"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          AuthenticationModule,
          DatabaseModule,
          AddressesModule
        ],
        controllers: [RestaurantsController],
        providers: [
          RestaurantsService,
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock },
          UploadFileService
        ],
      }).compile();
      service = module.get<RestaurantsService>(RestaurantsService);
    });

    const mockCreateRestaurantDto: CreateRestaurantDto = {
      email: "string",
      password: "string",
      name: "string",
      owner_name: "string",
      owner_surname: "string",
      id_address: 1,
      seats: 1,
      price_tier: 1,
      description: "string",
      phone: "string",
      accessibility: true
    }

    it('should create data', async () => {
      const expectedResult = {
        result: true,
        message: "Successfully created: restaurant",
        data: [
          {
            id: 1,
            email: "string",
            name: "string",
            owner_name: "string",
            owner_surname: "string",
            password: "string",
            id_address: 1,
            address_city: "string",
            address_street: "string",
            address_street_number: "string",
            address_state: "string",
            address_zip_code: "string",
            seats: 1,
            price_tier: 1,
            description: "string",
            phone: "string"
          }
        ],
      };
      const result = await service.create(mockCreateRestaurantDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.create(mockCreateRestaurantDto)).rejects.toThrow(InternalServerErrorException);
    });
  });





  describe('findAll', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue([
                {
                  id: 1,
                  email: "string",
                  name: "string",
                  owner_name: "string",
                  owner_surname: "string",
                  password: "string",
                  id_address: 1,
                  address_city: "string",
                  address_street: "string",
                  address_street_number: "string",
                  address_state: "string",
                  address_zip_code: "string",
                  seats: 1,
                  price_tier: 1,
                  description: "string",
                  phone: "string"
                }
              ]) as any
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          AuthenticationModule,
          DatabaseModule,
          AddressesModule
        ],
        controllers: [RestaurantsController],
        providers: [
          RestaurantsService,
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock },
          UploadFileService
        ],
      }).compile();
      service = module.get<RestaurantsService>(RestaurantsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            email: "string",
            name: "string",
            owner_name: "string",
            owner_surname: "string",
            password: "string",
            id_address: 1,
            address_city: "string",
            address_street: "string",
            address_street_number: "string",
            address_state: "string",
            address_zip_code: "string",
            seats: 1,
            price_tier: 1,
            description: "string",
            phone: "string"
          }
        ],
      };
      const result = await service.findAll();
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    });

  });




  describe('findAllByCity', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue([
                  {
                    id: 1,
                    email: "string",
                    name: "string",
                    owner_name: "string",
                    owner_surname: "string",
                    password: "string",
                    id_address: 1,
                    address_city: "string",
                    address_street: "string",
                    address_street_number: "string",
                    address_state: "string",
                    address_zip_code: "string",
                    seats: 1,
                    price_tier: 1,
                    description: "string",
                    phone: "string"
                  }
                ]) as any
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          AuthenticationModule,
          DatabaseModule,
          AddressesModule
        ],
        controllers: [RestaurantsController],
        providers: [
          RestaurantsService,
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock },
          UploadFileService
        ],
      }).compile();
      service = module.get<RestaurantsService>(RestaurantsService);
    });

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            email: "string",
            name: "string",
            owner_name: "string",
            owner_surname: "string",
            password: "string",
            id_address: 1,
            address_city: "string",
            address_street: "string",
            address_street_number: "string",
            address_state: "string",
            address_zip_code: "string",
            seats: 1,
            price_tier: 1,
            description: "string",
            phone: "string"
          }
        ],
      };
      const mockString = "string"
      const result = await service.findAllByCity(mockString);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      const mockString = "string"
      await expect(service.findAllByCity(mockString)).rejects.toThrow(InternalServerErrorException);
    });

  });




  describe('findOne', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              leftJoin: jest.fn().mockReturnValue({
                where: jest.fn().mockReturnValue([
                  {
                    id: 1,
                    email: "string",
                    name: "string",
                    owner_name: "string",
                    owner_surname: "string",
                    password: "string",
                    id_address: 1,
                    address_city: "string",
                    address_street: "string",
                    address_street_number: "string",
                    address_state: "string",
                    address_zip_code: "string",
                    seats: 1,
                    price_tier: 1,
                    description: "string",
                    phone: "string"
                  }
                ]) as any
              })
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          AuthenticationModule,
          DatabaseModule,
          AddressesModule
        ],
        controllers: [RestaurantsController],
        providers: [
          RestaurantsService,
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock },
          UploadFileService
        ],
      }).compile();
      service = module.get<RestaurantsService>(RestaurantsService);
    });

    it('should find data', async () => {
      const expectedResult = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            email: "string",
            name: "string",
            owner_name: "string",
            owner_surname: "string",
            password: "string",
            id_address: 1,
            address_city: "string",
            address_street: "string",
            address_street_number: "string",
            address_state: "string",
            address_zip_code: "string",
            seats: 1,
            price_tier: 1,
            description: "string",
            phone: "string"
          }
        ],
      };
      const mockId = 1;
      const result = await service.findOne(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      const mockId = 1;
      await expect(service.findOne(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on id error', async () => {
      const mockWrongId = 1.1;
      await expect(service.findOne(mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });




  describe('update', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          where: jest.fn().mockReturnThis(),
          set: jest.fn().mockReturnThis(),
          update: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id: 1,
              email: "string",
              name: "string",
              owner_name: "string",
              owner_surname: "string",
              password: "string",
              id_address: 1,
              address_city: "string",
              address_street: "string",
              address_street_number: "string",
              address_state: "string",
              address_zip_code: "string",
              seats: 1,
              price_tier: 1,
              description: "string",
              phone: "string"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          AuthenticationModule,
          DatabaseModule,
          AddressesModule
        ],
        controllers: [RestaurantsController],
        providers: [
          RestaurantsService,
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock },
          UploadFileService
        ],
      }).compile();
      service = module.get<RestaurantsService>(RestaurantsService);
    });

    const mockUpdateRestaurantDto: UpdateRestaurantDto = {
      email: "string",
      password: "string",
      name: "string",
      owner_name: "string",
      owner_surname: "string",
      id_address: 1,
      seats: 1,
      price_tier: 1,
      description: "string",
      phone: "string",
      accessibility: true
    }
    const mockId = 1;
    const mockWrongId = 1.1;

    it('should update data', async () => {
      const expectedResult = {
        result: true,
        message: "Update successful",
        data: [
          {
            id: 1,
            email: "string",
            name: "string",
            owner_name: "string",
            owner_surname: "string",
            password: "string",
            id_address: 1,
            address_city: "string",
            address_street: "string",
            address_street_number: "string",
            address_state: "string",
            address_zip_code: "string",
            seats: 1,
            price_tier: 1,
            description: "string",
            phone: "string"
          }
        ],
      };
      const mockId = 1;
      const result = await service.update(mockId, mockUpdateRestaurantDto);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      const mockId = 1;
      await expect(service.update(mockId, mockUpdateRestaurantDto)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on id error', async () => {
      await expect(service.update(mockWrongId, mockUpdateRestaurantDto)).rejects.toThrow(BadRequestException);
    });

  });



  describe('remove', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          where: jest.fn().mockReturnThis(),
          delete: jest.fn().mockReturnThis(),
          returning: jest.fn().mockReturnValueOnce([
            {
              id: 1,
              email: "string",
              name: "string",
              owner_name: "string",
              owner_surname: "string",
              password: "string",
              id_address: 1,
              address_city: "string",
              address_street: "string",
              address_street_number: "string",
              address_state: "string",
              address_zip_code: "string",
              seats: 1,
              price_tier: 1,
              description: "string",
              phone: "string"
            }
          ]) as any
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          AuthorizationModule,
          AuthenticationModule,
          DatabaseModule,
          AddressesModule
        ],
        controllers: [RestaurantsController],
        providers: [
          RestaurantsService,
          AddressesService,
          { provide: DatabaseService, useValue: databaseServiceMock },
          UploadFileService
        ],
      }).compile();
      service = module.get<RestaurantsService>(RestaurantsService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should update data', async () => {
      const expectedResult = {
        result: true,
        message: "Successfully deleted",
        data: [
          {
            id: 1,
            email: "string",
            name: "string",
            owner_name: "string",
            owner_surname: "string",
            password: "string",
            id_address: 1,
            address_city: "string",
            address_street: "string",
            address_street_number: "string",
            address_state: "string",
            address_zip_code: "string",
            seats: 1,
            price_tier: 1,
            description: "string",
            phone: "string"
          }
        ],
      };
      const mockId = 1;
      const result = await service.remove(mockId);
      expect(result).toEqual(expectedResult);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      const mockId = 1;
      await expect(service.remove(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should throw BadRequestException on id error', async () => {
      await expect(service.remove(mockWrongId)).rejects.toThrow(BadRequestException);
    });

  });
});
