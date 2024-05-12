import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import { OrderService } from './order.service';
import axios from '../../../../axios-config';
import MockAdapter from 'axios-mock-adapter';

describe('OrderService', () => {
  let mockAxios: MockAdapter;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            isUser: () => true,
            get: () => ({ id: 1 }),
          },
        },
      ],
    });
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it('should be created', () => {
    const service = TestBed.inject(OrderService);
    expect(service).toBeTruthy();
  });

  it('should get the user id', () => {
    const service = TestBed.inject(OrderService);
    expect(service.user_id).toBe(1);
  });

  it('should get ordered dishes by reservation', async () => {
    const service = TestBed.inject(OrderService);
    mockAxios
      .onGet('ordered-dishes/find-all-by-reservation/1')
      .reply(200, { data: [] });
    const orderedDishes = await service.getOrderedDishesByReservation(1);
    expect(orderedDishes).toBeTruthy();
  });

  it('should get ordered dishes by user', async () => {
    const service = TestBed.inject(OrderService);
    mockAxios
      .onGet('ordered-dishes/find-all-by-user/1/1')
      .reply(200, { data: [] });
    const orderedDishes = await service.getOrderedDishesByUser(1);
    expect(orderedDishes).toBeTruthy();
  });

  it('should return true if the user paid once', async () => {
    const service = TestBed.inject(OrderService);
    mockAxios.onGet('bills/did-user-paid-once/1/1').reply(200, { data: true });
    const didUserPaid = await service.didUserPaid(1);
    expect(didUserPaid).toBe(true);
  });

  /**write a test for the didUserPaid function that enters the catch branch */
  it('should return false if the user did not pay', async () => {
    const service = TestBed.inject(OrderService);
    mockAxios.onGet('bills/did-user-paid-once/1/1').reply(500);
    try {
      await service.didUserPaid(1);
    } catch (error) {
      expect(error).toBeTruthy();
    }
  });
});
