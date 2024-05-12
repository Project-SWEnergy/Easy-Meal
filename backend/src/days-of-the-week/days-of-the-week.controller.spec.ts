import { Test, TestingModule } from '@nestjs/testing';
import { DaysOfTheWeekController } from './days-of-the-week.controller';
import { DaysOfTheWeekService } from './days-of-the-week.service';
import { DatabaseModule } from '../database/database.module';

jest.mock('../database/database.service');
jest.mock('./days-of-the-week.service');
jest.mock('../authentication/authentication.service');
jest.mock('../authorization/authorization.service');

describe('DaysOfTheWeekController', () => {
  let controller: DaysOfTheWeekController;
  let service: DaysOfTheWeekService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
      ],
      controllers: [DaysOfTheWeekController],
      providers: [DaysOfTheWeekService],
    }).compile();

    controller = module.get<DaysOfTheWeekController>(DaysOfTheWeekController);
    service = module.get<DaysOfTheWeekService>(DaysOfTheWeekService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  describe('get-one-from-id', () => {
    const expectedResult = {
      result: true,
      message: "Research successful",
      data: [
        {
          id: 2,
          name: "Martedì",
          abbreviation: "MAR",
          order: 2
        }
      ]
    }
    const mockId = "1"
    it('should return data', async () => {
      jest.spyOn(service, 'getNameFromId').mockResolvedValue(expectedResult);
      const result = await controller.getOneFromId(mockId);
      expect(result).toEqual(expectedResult);
      expect(service.getNameFromId).toHaveBeenCalledWith(parseInt(mockId));
    });
  });



  describe('find-all', () => {
    const expectedResult = {
      result: true,
      message: "Research successful",
      data: [
        {
          id: 2,
          name: "Martedì",
          abbreviation: "MAR",
          order: 2
        }
      ]
    }
    it('should return data', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);
      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
    });
  });
});
