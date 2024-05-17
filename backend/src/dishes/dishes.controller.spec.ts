import { Test, TestingModule } from '@nestjs/testing';
import { DishesController } from './dishes.controller';
import { DishesService } from './dishes.service';
import { AuthorizationModule } from '../authorization/authorization.module';
import { DatabaseModule } from '../database/database.module';
import { UploadFileModule } from '../upload-file/upload-file.module';
import { AuthorizationService } from '../authorization/authorization.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { ResultDishesDto } from './dto/result-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

jest.mock('../database/database.service');
jest.mock('./dishes.service');
jest.mock('../authentication/authentication.service');
jest.mock('../authorization/authorization.service');
jest.mock('../upload-file/upload-file.service');


interface MulterFileMock extends Express.Multer.File {}


describe('DishesController', () => {
  let controller: DishesController;
  let service: DishesService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthorizationModule,
        DatabaseModule,
        UploadFileModule
      ],
      controllers: [DishesController],
      providers: [DishesService],
    }).compile();

    controller = module.get<DishesController>(DishesController);
    service = module.get<DishesService>(DishesService);
    authorizationService  = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });




  describe('create', () => {
    const multerFileMock: MulterFileMock = {
      fieldname: 'file',
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

    it('should create and return a response with status 200', async () => {
      const createDto: CreateDishDto = {
        id_restaurant: 1,
        name: "",
        description: "",
        price: 1,
        image: ""
      };
      const expectedResult: ResultDishesDto = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "",
            description: "",
            price: 1,
            image: ""
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      const result = await controller.create(createDto, req, multerFileMock);
      expect(result).toEqual(expectedResult);
      expect(service.create).toHaveBeenCalledWith(createDto);
    });
  });



  describe('findAllByRestaurantId', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultDishesDto = {
        result: true,
        message: 'message',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "",
            description: "",
            price: 1,
            image: ""
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
      const expectedResult: ResultDishesDto = {
        result: true,
        message: 'message',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "",
            description: "",
            price: 1,
            image: ""
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
    const multerFileMock: MulterFileMock = {
      fieldname: 'file',
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

    it('should create and return a response with status 200', async () => {
      const mockId = "1";
      const updateDto: UpdateDishDto = {
        id_restaurant: 1,
        name: "",
        description: "",
        price: 1,
        image: ""
      };
      const expectedResult: ResultDishesDto = {
        result: true,
        message: 'Successfully updated',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "",
            description: "",
            price: 1,
            image: ""
          }
        ]
      };
      const mockFindOne = {
        result: true,
        message: "as",
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "",
            description: "",
            price: 1,
            image: ""
          }
        ]
      }
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(service, 'update').mockResolvedValue(expectedResult);
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(service, 'findOne').mockResolvedValue(mockFindOne);
      const result = await controller.update(mockId, updateDto, req, multerFileMock);
      expect(result).toEqual(expectedResult);
      expect(service.update).toHaveBeenCalledWith(parseInt(mockId), updateDto);
    });
  });




  describe('remove', () => {

    it('should search and return a response with status 200', async () => {
      const mockId = "1";
      const expectedResult: ResultDishesDto = {
        result: true,
        message: 'message',
        data: [
          {
            id: 1,
            id_restaurant: 1,
            name: "",
            description: "",
            price: 1,
            image: ""
          }
        ]
      };
      const req = { cookies: { accessToken: 'mockAccessToken' } };
      jest.spyOn(authorizationService, 'isAuthorized').mockReturnValue({ token: { id: 1 } });
      jest.spyOn(service, 'remove').mockResolvedValue(expectedResult);
      const result = await controller.remove(mockId, req);
      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith(parseInt(mockId));
    });
  });

});
