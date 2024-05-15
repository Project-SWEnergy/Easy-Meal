import { TestBed } from '@angular/core/testing';
import axios from '../../../../axios-config';
import MockAdapter from 'axios-mock-adapter';
import { RestaurantRistoratoreService } from './restaurant.ristoratore.service';
import { AuthService } from '../auth.service';
import { MessageService } from '../lib/message.service';
import {
  OpeningHoursCreate,
  RestaurantCreate,
} from '../../interfaces/restaurant';

describe('RestaurantRistoratoreService', () => {
  let service: RestaurantRistoratoreService;
  let mockAxios: MockAdapter;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockMessageService: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    mockAuthService = jasmine.createSpyObj('AuthService', ['auth']);
    mockMessageService = jasmine.createSpyObj('MessageService', [
      'log',
      'error',
    ]);

    TestBed.configureTestingModule({
      providers: [
        RestaurantRistoratoreService,
        { provide: AuthService, useValue: mockAuthService },
        { provide: MessageService, useValue: mockMessageService },
      ],
    });
    service = TestBed.inject(RestaurantRistoratoreService);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should create a restaurant and handle opening hours', async () => {
    const restaurantData = { id: 1, name: 'Test Restaurant' };
    const hoursData = [
      { opening_time: '08:00', closing_time: '23:00' },
    ] as OpeningHoursCreate[];

    mockAxios.onPost('restaurants/create').reply(200, {
      result: true,
      data: [restaurantData],
      message: 'Restaurant created successfully',
    });
    mockAxios.onPost('opening-hours/create').reply(200, { result: true });

    mockAuthService.auth.and.returnValue(Promise.resolve());

    const result = await service.create(
      { logo: 'hello' as any as File } as RestaurantCreate,
      hoursData,
    );

    expect(result).toBeTrue();
    expect(mockMessageService.log.calls.count()).toEqual(1);
    expect(mockAuthService.auth).toHaveBeenCalled();
  });

  it('should handle errors during restaurant creation', async () => {
    mockAxios.onPost('restaurants/create').reply(200, { result: false });

    await service.create(
      { logo: 'Test Restaurant' as any as File } as RestaurantCreate,
      [],
    );
    expect(mockMessageService.error).toHaveBeenCalled();
  });

  it('should create a restaurant and handle opening hours\' failure', async () => {
    const restaurantData = { id: 1, name: 'Test Restaurant' };
    const hoursData = [
      { opening_time: '08:00', closing_time: '23:00' },
    ] as OpeningHoursCreate[];

    mockAxios.onPost('restaurants/create').reply(200, {
      result: true,
      data: [restaurantData],
      message: 'Restaurant created successfully',
    });
    mockAxios.onPost('opening-hours/create').reply(200, { result: false });

    mockAuthService.auth.and.returnValue(Promise.resolve());

    const result = await service.create(
      { logo: 'hello' as any as File } as RestaurantCreate,
      hoursData,
    );

    expect(result).toBeTrue();
    expect(mockMessageService.log.calls.count()).toEqual(1);
    expect(mockAuthService.auth).toHaveBeenCalled();
    expect(mockMessageService.error).toHaveBeenCalledWith(
      'Something went wrong in the creation of the opening hours',
    );
  });
});
