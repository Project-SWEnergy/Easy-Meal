import { Test, TestingModule } from '@nestjs/testing';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { DatabaseModule } from '../database/database.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { ResultTagDto } from './dto/result-tag.dto';
import { desc } from 'drizzle-orm';

jest.mock('../database/database.service');

describe('TagsController', () => {
  let controller: TagsController;
  let service: TagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        AuthorizationModule,
      ],
      controllers: [TagsController],
      providers: [TagsService],
    }).compile();

    controller = module.get<TagsController>(TagsController);
    service = module.get<TagsService>(TagsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe ('findAll', () => {
    let expectedResult  = {
      result: true,
      message: 'Successfully created',
      data: [ { id: 1, name: 'tag1' } ]
    } as ResultTagDto;

    it('findAll', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);
      expect(await controller.findAll()).toBe(expectedResult);
    });  

  });

  describe ('findOne', () => {
    let expectedResult  = {
      result: true,
      message: 'Successfully created',
      data: [ { id: 1, name: 'tag1' } ]
    } as ResultTagDto;

    it('findOne', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);
      expect(await controller.findOne('1')).toBe(expectedResult);
    });  

  });

  describe ('findByName', () => {
    let expectedResult  = {
      result: true,
      message: 'Successfully created',
      data: [ { id: 1, name: 'tag1' } ]
    } as ResultTagDto;

    it('findByName', async () => {
      jest.spyOn(service, 'findByName').mockResolvedValue(expectedResult);
      expect(await controller.findByName('tag1')).toBe(expectedResult);
    });
  })
});
