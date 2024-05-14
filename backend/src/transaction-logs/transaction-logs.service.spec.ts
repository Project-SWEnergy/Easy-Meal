import { Test, TestingModule } from '@nestjs/testing';
import { TransactionLogsService } from './transaction-logs.service';
import { DatabaseService } from '../database/database.service';
import { BadRequestException } from '@nestjs/common';


jest.mock('../database/database.service');

describe('TransactionLogsService', () => {
  let service: TransactionLogsService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionLogsService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();

    service = module.get<TransactionLogsService>(TransactionLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          insert: jest.fn(() => ({
            values: jest.fn(() => ({
              returning: jest.fn(() => ([
                {
                  id_bill: 1,
                  timestamp: new Date("2021-10-10T10:00:00.000Z"),
                  transaction_state: 'state',
                  message: 'message'
                }
              ]))
            }))
          }))
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TransactionLogsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<TransactionLogsService>(TransactionLogsService);
    });
    it('should create a new transaction log', async () => {
      
      // Arrange
      const createTransactionLogDto = {
        id_bill: 1,
        timestamp: new Date("2021-10-10T10:00:00.000Z"),
        transaction_state: 'state',
        message: 'message'
      };
      const expectedResult = {
        result: true,
        message: 'Successfully created',
        data: [
          {
            id_bill: 1,
            timestamp: new Date("2021-10-10T10:00:00.000Z"),
            transaction_state: 'state',
            message: 'message'
          }
        ]
      };
      // Act
      const result = await service.create(createTransactionLogDto);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    it ('should throw an error if the bill ID is not an integer', async () => {
      // Arrange
      const createTransactionLogDto = {
        id_bill: 1.5,
        timestamp: new Date(),
        transaction_state: 'state',
        message: 'message'
      };
      // Act and Assert
      await expect(service.create(createTransactionLogDto)).rejects.toThrow("Invalid bill ID");
    });
  });

  describe('findAllByBillId', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn(() => ({
            from: jest.fn(() => ({
              where: jest.fn(() => ([
                {
                  id_bill: 1,
                  timestamp: new Date("2021-10-10T10:00:00.000Z"),
                  transaction_state: 'state',
                  message: 'message'
                }
              ]))
            }))
          }))
        })) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TransactionLogsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<TransactionLogsService>(TransactionLogsService);
    });

    it('should return all transaction logs for a given bill ID', async () => {
      // Arrange
      const expectedResult = {
        result: true,
        message: 'Research successfull',
        data: [
          {
            id_bill: 1,
            timestamp: new Date("2021-10-10T10:00:00.000Z"),
            transaction_state: 'state',
            message: 'message'
          }
        ]
      };
      // Act
      const result = await service.findAllByBillId(1);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    it ('should throw an error if the bill ID is not an integer', async () => {
      // Arrange
      const id = 1.5;
      // Act and Assert
      await expect(service.findAllByBillId(id)).rejects.toThrow("Invalid bill ID");
    });
  });

  describe('remove', () => {
    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          delete: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          returning: jest.fn().mockResolvedValue([
            {
              id_bill: 1,
              timestamp: new Date("2021-10-10T10:00:00.000Z"),
              transaction_state: 'state',
              message: 'message'
            }
          ]) as any
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TransactionLogsService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<TransactionLogsService>(TransactionLogsService);
    });

    it('should remove a transaction log', async () => {
      // Arrange
      const expectedResult = {
        result: true,
        message: 'Successfully deleted',
        data: [
          {
            id_bill: 1,
            timestamp: new Date("2021-10-10T10:00:00.000Z"),
            transaction_state: 'state',
            message: 'message'
          }
        ]
      };
      // Act
      const result = await service.remove(1);
      // Assert
      expect(result).toEqual(expectedResult);
    });

    it ('should throw an error if the ID is not an integer', async () => {
      // Arrange
      const id = 1.5;
      // Act and Assert
      await expect(service.remove(id)).rejects.toThrow("Invalid ID");
    });

    it('should throw BadRequestException for missing transaction ID', async () => {
      databaseServiceMock = {
        getDatabase: jest.fn().mockReturnValue({
          delete: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          returning: jest.fn().mockResolvedValue([]),
        }),
      };
      const id = 1;
  
      await expect(service.remove.call({ databaseService: databaseServiceMock }, id)).rejects.toThrow(BadRequestException);
    });
  });
});
