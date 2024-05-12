import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsTagsController } from './restaurants-tags.controller';
import { RestaurantsTagsService } from './restaurants-tags.service';

describe('RestaurantsTagsController', () => {
  let controller: RestaurantsTagsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsTagsController],
      providers: [RestaurantsTagsService],
    }).compile();

    controller = module.get<RestaurantsTagsController>(RestaurantsTagsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
