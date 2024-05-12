import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsTagsService } from './restaurants-tags.service';

describe('RestaurantsTagsService', () => {
  let service: RestaurantsTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantsTagsService],
    }).compile();

    service = module.get<RestaurantsTagsService>(RestaurantsTagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
