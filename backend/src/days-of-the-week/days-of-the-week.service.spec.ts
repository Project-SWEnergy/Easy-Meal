import { Test, TestingModule } from '@nestjs/testing';
import { DaysOfTheWeekService } from './days-of-the-week.service';
import { DatabaseService } from '../database/database.service';
import { DatabaseModule } from '../database/database.module';
import { DaysOfTheWeekController } from './days-of-the-week.controller';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

jest.mock('../database/database.service');

describe('DaysOfTheWeekService', () => {
  let service: DaysOfTheWeekService;
  let databaseServiceMock: Partial<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
      ],
      controllers: [DaysOfTheWeekController],
      providers: [
        DaysOfTheWeekService,
        { provide: DatabaseService, useValue: databaseServiceMock }
      ],
    }).compile();

    service = module.get<DaysOfTheWeekService>(DaysOfTheWeekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });



  describe('getNameFromId', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue({
              where: jest.fn().mockReturnValue([
                {
                  id: 2,
                  name: "Martedì",
                  abbreviation: "MAR",
                  order: 2
                }
              ]) as any
            })
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          DatabaseModule,
        ],
        controllers: [DaysOfTheWeekController],
        providers: [
          DaysOfTheWeekService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DaysOfTheWeekService>(DaysOfTheWeekService);
    });

    const mockId = 1;
    const mockWrongId = 1.1;

    it('should throw BadRequestException for non-integer id', async () => {
      await expect(service.getNameFromId(mockWrongId)).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.getNameFromId(mockId)).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 2,
            name: "Martedì",
            abbreviation: "MAR",
            order: 2
          }
        ]
      };
      const result = await service.getNameFromId(mockId);
      expect(result).toEqual(expectedResult);
    });
  });




  describe('findAll', () => {

    beforeEach(async () => {
      databaseServiceMock = {
        getDatabase: jest.fn(() => ({
          select: jest.fn().mockReturnValue({
            from: jest.fn().mockReturnValue([
              {
                id: 2,
                name: "Martedì",
                abbreviation: "MAR",
                order: 2
              }
            ]) as any
          })
        })
        ) as () => any
      };
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          DatabaseModule,
        ],
        controllers: [DaysOfTheWeekController],
        providers: [
          DaysOfTheWeekService,
          { provide: DatabaseService, useValue: databaseServiceMock }
        ],
      }).compile();
      service = module.get<DaysOfTheWeekService>(DaysOfTheWeekService);
    });


    it('should throw InternalServerErrorException on database error', async () => {
      (databaseServiceMock.getDatabase as jest.Mock).mockImplementation(() => {
        throw new InternalServerErrorException('Mocked error');
      });
      await expect(service.findAll()).rejects.toThrow(InternalServerErrorException);
    });

    it('should return successful response with found data', async () => {
      const expectedResult = {
        result: true,
        message: 'Research successful',
        data: [
          {
            id: 2,
            name: "Martedì",
            abbreviation: "MAR",
            order: 2
          }
        ]
      };
      const result = await service.findAll();
      expect(result).toEqual(expectedResult);
    });
  });
});
