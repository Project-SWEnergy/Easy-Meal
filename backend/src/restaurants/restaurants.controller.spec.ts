import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsService } from './restaurants.service';
import { AddressesService } from '../addresses/addresses.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { UploadFileService } from '../upload-file/upload-file.service';
import { CreateRestaurantAddressDto } from './dto/create-restaurant-address.dto';
import { Response } from 'express';
import { UserType } from '../authentication/dto/user-data.dto';
import { AddressesModule } from '../addresses/addresses.module';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { ResultAddressDto } from 'src/addresses/dto/result-address.dto';
import { UpdateRestaurantAddressDto } from './dto/update-restaurant-address.dto';

interface MulterFileMock extends Express.Multer.File { }

jest.mock('../database/database.service');
jest.mock('./restaurants.service');
jest.mock('../authentication/authentication.service');
jest.mock('../authorization/authorization.service');
jest.mock('../upload-file/upload-file.service');
jest.mock('../addresses/addresses.service');

describe('RestaurantsController', () => {
  let controller: RestaurantsController;
  let restaurantsService: RestaurantsService;
  let addressesService: Partial<AddressesService>;
  let authorizationService: AuthorizationService;
  let authenticationService: AuthenticationService;
  let uploadFileService: UploadFileService;

  beforeEach(async () => {
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
        { provide: AddressesService, useValue: addressesService },
        UploadFileService
      ],
    }).compile();

    controller = module.get<RestaurantsController>(RestaurantsController);
    restaurantsService = module.get<RestaurantsService>(RestaurantsService);
    addressesService = module.get<AddressesService>(AddressesService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
    authenticationService = module.get<AuthenticationService>(AuthenticationService);
    uploadFileService = module.get<UploadFileService>(UploadFileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });



  describe('findAll', () => {
    it('should return all restaurants', async () => {
      const restaurants = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            email: "email@email.com",
            name: "Nome",
            owner_name: "Nome",
            owner_surname: "Cognome",
            id_address: 1,
            address_city: "Padova",
            address_street: "Via",
            address_street_number: "12",
            address_state: "Ita",
            address_zip_code: "35128",
            seats: 1,
            website: "a",
            price_tier: 1,
            description: "",
            phone: "00000000000",
            children_seats: null,
            accessibility: null,
            logo: "./resources/restaurant/1/8fb6fa4b-2f82-4f89-8766-717efeef1faa.png",
            banner_image: "./resources/restaurant/1/d2ae989e-9e8f-4736-8fc0-8c62c4a63763.png"
          }
        ]
      }

      jest.spyOn(restaurantsService, 'findAll').mockResolvedValue(restaurants);

      expect(await controller.findAll()).toBe(restaurants);
    });
  });




  describe('findAllByCity', () => {

    it('should return all restaurants', async () => {
      const restaurants = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            email: "email@email.com",
            name: "Nome",
            owner_name: "Nome",
            owner_surname: "Cognome",
            id_address: 1,
            address_city: "Padova",
            address_street: "Via",
            address_street_number: "12",
            address_state: "Ita",
            address_zip_code: "35128",
            seats: 1,
            website: "a",
            price_tier: 1,
            description: "",
            phone: "00000000000",
            children_seats: null,
            accessibility: null,
            logo: "./resources/restaurant/1/8fb6fa4b-2f82-4f89-8766-717efeef1faa.png",
            banner_image: "./resources/restaurant/1/d2ae989e-9e8f-4736-8fc0-8c62c4a63763.png"
          }
        ]
      }
      const mockId = "1"

      jest.spyOn(restaurantsService, 'findAllByCity').mockResolvedValue(restaurants);

      expect(await controller.findAllByCity(mockId)).toBe(restaurants);
    });
  });




  describe('findOne', () => {

    it('should return all restaurants', async () => {
      const restaurants = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            email: "email@email.com",
            name: "Nome",
            owner_name: "Nome",
            owner_surname: "Cognome",
            id_address: 1,
            address_city: "Padova",
            address_street: "Via",
            address_street_number: "12",
            address_state: "Ita",
            address_zip_code: "35128",
            seats: 1,
            website: "a",
            price_tier: 1,
            description: "",
            phone: "00000000000",
            children_seats: null,
            accessibility: null,
            logo: "./resources/restaurant/1/8fb6fa4b-2f82-4f89-8766-717efeef1faa.png",
            banner_image: "./resources/restaurant/1/d2ae989e-9e8f-4736-8fc0-8c62c4a63763.png"
          }
        ]
      }
      const mockId = "1"

      jest.spyOn(restaurantsService, 'findOne').mockResolvedValue(restaurants);

      expect(await controller.findOne(mockId)).toBe(restaurants);
    });
  });




  describe('create', () => {

    beforeEach(async () => {
      addressesService = {
        create: jest.fn(() => ({
          result: true,
          message: "",
          data: [
            {
              id: 1,
              city: "addresses.city",
              street: "addresses.street",
              street_number: "addresses.street_number",
              state: "addresses.state",
              zip_code: "addresses.zip_code"
            }
          ]
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
          { provide: AddressesService, useValue: addressesService },
          UploadFileService
        ],
      }).compile();

      controller = module.get<RestaurantsController>(RestaurantsController);
      restaurantsService = module.get<RestaurantsService>(RestaurantsService);
      authorizationService = module.get<AuthorizationService>(AuthorizationService);
      authenticationService = module.get<AuthenticationService>(AuthenticationService);
      uploadFileService = module.get<UploadFileService>(UploadFileService);
    });


    const multerFileMock: MulterFileMock = {
      fieldname: 'files',
      originalname: 'example.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      destination: '/tmp',
      filename: 'example.txt',
      path: '/tmp/example.txt',
      size: 1234,
      stream: undefined,
      buffer: Buffer.from('Contenuto del file'),
    };

    const filesMock: { logo?: MulterFileMock[], banner_image?: MulterFileMock[] } = {
      logo: [multerFileMock],
      banner_image: [multerFileMock],
    };

    it('should create a new restaurant', async () => {
      const mockCreateRestaurantAddressDto: CreateRestaurantAddressDto = {
        createRestaurantDto: {
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
        },
        createAddressDto: {
          city: "Padova",
          street: "Via Vai",
          street_number: "1A",
          state: "Italia",
          zip_code: "35100"
        }
      };
      const mockCreateResult = {
        result: true,
        message: "",
        data: [
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
        ],
      };

      //jest.spyOn(addressesService, 'create').mockResolvedValueOnce(mockCreatedAddress);
      jest.spyOn(restaurantsService, 'create').mockResolvedValueOnce(mockCreateResult);
      jest.spyOn(uploadFileService, 'uploadImage').mockReturnValueOnce('logo_path');
      jest.spyOn(uploadFileService, 'uploadImage').mockReturnValueOnce('banner_image_path');
      jest.spyOn(authenticationService, 'signinRestaurant').mockResolvedValueOnce({
        result: true,
        message: "",
        user: { id: 1, role: UserType.user },
      });
      jest.spyOn(authenticationService, 'generateAccessToken').mockResolvedValueOnce('access_token');

      const mockResponse = {
        cookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const result = await controller.create(mockCreateRestaurantAddressDto, mockResponse as unknown as Response, filesMock);

      expect(addressesService.create).toHaveBeenCalledWith(mockCreateRestaurantAddressDto.createAddressDto);
      expect(restaurantsService.create).toHaveBeenCalledWith(mockCreateRestaurantAddressDto.createRestaurantDto);
      expect(uploadFileService.uploadImage).toHaveBeenCalledTimes(2);
      expect(authenticationService.signinRestaurant).toHaveBeenCalled();
      expect(authenticationService.generateAccessToken).toHaveBeenCalled();
      expect(mockResponse.cookie).toHaveBeenCalledWith('accessToken', 'access_token', { httpOnly: true });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCreateResult);
    });

  });





  describe('update', () => {

    beforeEach(async () => {
      addressesService = {
        update: jest.fn(() => ({
          result: true,
          message: "",
          data: [
            {
              id: 1,
              city: "addresses.city",
              street: "addresses.street",
              street_number: "addresses.street_number",
              state: "addresses.state",
              zip_code: "addresses.zip_code"
            }
          ]
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
          { provide: AddressesService, useValue: addressesService },
          UploadFileService
        ],
      }).compile();

      controller = module.get<RestaurantsController>(RestaurantsController);
      restaurantsService = module.get<RestaurantsService>(RestaurantsService);
      authorizationService = module.get<AuthorizationService>(AuthorizationService);
      authenticationService = module.get<AuthenticationService>(AuthenticationService);
      uploadFileService = module.get<UploadFileService>(UploadFileService);
    });

    const multerFileMock: MulterFileMock = {
      fieldname: 'files',
      originalname: 'example.txt',
      encoding: '7bit',
      mimetype: 'text/plain',
      destination: '/tmp',
      filename: 'example.txt',
      path: '/tmp/example.txt',
      size: 1234,
      stream: undefined,
      buffer: Buffer.from('Contenuto del file'),
    };
    const updateRestaurantAddressDtoMock: UpdateRestaurantAddressDto = {
      updateAddressDto: {
        city: "Padova",
        street: "Via Vai",
        street_number: "1A",
        state: "Italia",
        zip_code: "35100"
      },
      updateRestaurantDto: {
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
        accessibility: true,
        logo: "logo_path",
        banner_image: "banner_image_path"
      }
    };
    const filesMock: { logo?: Express.Multer.File[], banner_image?: Express.Multer.File[] } = {
      logo: [multerFileMock],
      banner_image: [multerFileMock],
    };
    const mockRequest = { cookies: { accessToken: 'mock_access_token' } };

    it('should update a restaurant', async () => {
      const accessTokenMock = 'mock_access_token';
      const idRestaurantMock = 1;

      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce({ token: { id: idRestaurantMock } });
      jest.spyOn(uploadFileService, 'removeImage').mockReturnValueOnce(undefined);
      jest.spyOn(uploadFileService, 'uploadImage').mockReturnValueOnce('updated_logo_path');
      jest.spyOn(uploadFileService, 'uploadImage').mockReturnValueOnce('updated_banner_image_path');

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await controller.update(updateRestaurantAddressDtoMock, mockRequest, filesMock);

      expect(authorizationService.isAuthorized).toHaveBeenCalledWith(accessTokenMock, UserType.restaurant);
      expect(addressesService.update).toHaveBeenCalledWith(updateRestaurantAddressDtoMock.updateAddressDto, updateRestaurantAddressDtoMock.updateRestaurantDto.id_address);
      expect(uploadFileService.removeImage).toHaveBeenCalledTimes(2);
      expect(uploadFileService.uploadImage).toHaveBeenCalledTimes(2);
      expect(restaurantsService.update).toHaveBeenCalledWith(idRestaurantMock, updateRestaurantAddressDtoMock.updateRestaurantDto);
    });
  });





  describe('remove', () => {

    beforeEach(async () => {
      addressesService = {
        remove: jest.fn(() => ({
          result: true,
          message: "",
          data: [
            {
              id: 1,
              city: "addresses.city",
              street: "addresses.street",
              street_number: "addresses.street_number",
              state: "addresses.state",
              zip_code: "addresses.zip_code"
            }
          ]
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
          { provide: AddressesService, useValue: addressesService },
          UploadFileService
        ],
      }).compile();

      controller = module.get<RestaurantsController>(RestaurantsController);
      restaurantsService = module.get<RestaurantsService>(RestaurantsService);
      authorizationService = module.get<AuthorizationService>(AuthorizationService);
      authenticationService = module.get<AuthenticationService>(AuthenticationService);
      uploadFileService = module.get<UploadFileService>(UploadFileService);
    });

    it('should remove a restaurant', async () => {
      // Mock dei dati di mock e delle funzioni chiamate all'interno della funzione remove
      const accessTokenMock = 'mock_access_token';
      const idRestaurantMock = 1;
      const idAddressMock = 1;
      const removedAddressMock = {
        result: true,
        message: "",
        data: [
          {
            id: 1,
            city: "addresses.city",
            street: "addresses.street",
            street_number: "addresses.street_number",
            state: "addresses.state",
            zip_code: "addresses.zip_code"
          }
        ]
      };
      const removedRestaurantMock = {
        result: true,
        message: "",
        data: [
          {
            id: 1,
            city: "addresses.city",
            street: "addresses.street",
            street_number: "addresses.street_number",
            state: "addresses.state",
            zip_code: "addresses.zip_code"
          }
        ]
      };
      const mockRequest = { cookies: { accessToken: 'mock_access_token' } };
      const ResultFindOne = {
        result: true,
        message: "Research successful",
        data: [
          {
            id: 1,
            email: "email@email.com",
            name: "Nome",
            owner_name: "Nome",
            owner_surname: "Cognome",
            id_address: 1,
            address_city: "Padova",
            address_street: "Via",
            address_street_number: "12",
            address_state: "Ita",
            address_zip_code: "35128",
            seats: 1,
            website: "a",
            price_tier: 1,
            description: "",
            phone: "00000000000",
            children_seats: null,
            accessibility: null,
            logo: "./resources/restaurant/1/8fb6fa4b-2f82-4f89-8766-717efeef1faa.png",
            banner_image: "./resources/restaurant/1/d2ae989e-9e8f-4736-8fc0-8c62c4a63763.png"
          }
        ]
      }


      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValueOnce({ token: { id: idRestaurantMock } });
      jest.spyOn(restaurantsService, 'findOne').mockResolvedValueOnce(ResultFindOne);
      jest.spyOn(addressesService, 'remove').mockResolvedValueOnce(removedAddressMock);
      jest.spyOn(restaurantsService, 'remove').mockResolvedValueOnce(removedRestaurantMock);

      const result = await controller.remove(mockRequest);

      expect(authorizationService.isAuthorized).toHaveBeenCalledWith(accessTokenMock, UserType.restaurant);
      expect(restaurantsService.findOne).toHaveBeenCalledWith(idRestaurantMock);
      expect(addressesService.remove).toHaveBeenCalledWith(idAddressMock);
      expect(restaurantsService.remove).toHaveBeenCalledWith(idRestaurantMock);
      expect(result).toBe(removedRestaurantMock);
    });
  });

});
