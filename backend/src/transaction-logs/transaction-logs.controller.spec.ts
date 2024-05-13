import { Test, TestingModule } from '@nestjs/testing';
import { TransactionLogsController } from './transaction-logs.controller';
import { TransactionLogsService } from './transaction-logs.service';
import { AuthorizationService } from '../authorization/authorization.service';
import { DatabaseService } from '../database/database.service';
import { CreateTransactionLogDto } from './dto/create-transaction-log.dto';

jest.mock('../authorization/authorization.service');
jest.mock('../database/database.service');

describe('TransactionLogsController', () => {
  let controller: TransactionLogsController;
  let transactionLogsService: TransactionLogsService;
  let authorizationService: AuthorizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionLogsController],
      providers: [TransactionLogsService, AuthorizationService, DatabaseService],
    }).compile();

    controller = module.get<TransactionLogsController>(TransactionLogsController);
    transactionLogsService = module.get<TransactionLogsService>(TransactionLogsService);
    authorizationService = module.get<AuthorizationService>(AuthorizationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {

    it('should create a new transaction log and return a response with status 200', async () => {
      // Arrange
      const createTransactionLogDto: CreateTransactionLogDto = {
        id_bill: 1,
        timestamp: new Date(),
        transaction_state: 'state',
        message: 'message'
      };
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id: 1,
            bill_id: 1,
            amount: 100
          }
        ]
      };
      jest.spyOn(transactionLogsService, 'create').mockResolvedValue(expectedResult);
      const req = {
        cookies: {
          accessToken: 'token'
        }
      };
      // Act
      const result = await controller.create(createTransactionLogDto, req);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAllByBillId', () => {
    it('should return a response with status 200', async () => {
      // Arrange
      const expectedResult = {
        result: true,
        message: 'Successfully found',
        data: [
          {
            id: 1,
            bill_id: 1,
            amount: 100
          }
        ]
      };
      jest.spyOn(transactionLogsService, 'findAllByBillId').mockResolvedValue(expectedResult);
      const req = {
        cookies: {
          accessToken: 'token'
        }
      };
      // Act
      const result = await controller.findAllByBillId('1', req);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should return a response with status 200', async () => {
      // Arrange
      const expectedResult = {
        result: true,
        message: 'Successfully removed',
        data: [
          {
            id: 1,
            bill_id: 1,
            amount: 100
          }
        ]
      };
      jest.spyOn(transactionLogsService, 'remove').mockResolvedValue(expectedResult);
      const req = {
        cookies: {
          accessToken: 'token'
        }
      };
      // Act
      const result = await controller.remove('1', req);
      // Assert
      expect(result).toEqual(expectedResult);
    });
  });

});
