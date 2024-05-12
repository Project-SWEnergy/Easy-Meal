import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import axios from '../../../../axios-config';
import { PagamentoService } from './pagamento.service';

describe('PagamentoService', () => {
  let service: PagamentoService;

  beforeEach(() => {
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
    service = TestBed.inject(PagamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user total bill', async () => {
    const reservationId = 1;
    const mockResponse = {
      result: true,
      message: 'User total bill fetched successfully',
      data: [
        {
          id_reservation: 1,
          id_user: 1,
          total_bill: '100.00',
        },
        {
          id_reservation: 2,
          id_user: 1,
          total_bill: '50.00',
        },
      ],
    };
    spyOn(axios, 'get').and.returnValue(
      Promise.resolve({ data: mockResponse }),
    );

    const result = await service.getUserTotalBill(reservationId);
    expect(result).toEqual(mockResponse);
  });

  it('should get reservation total bill', async () => {
    const reservationId = 1;
    const mockResponse = {
      result: true,
      message: 'Reservation total bill fetched successfully',
      data: [
        {
          id_reservation: 1,
          total_bill: '200.00',
        },
        {
          id_reservation: 2,
          total_bill: '150.00',
        },
      ],
    };
    spyOn(axios, 'get').and.returnValue(
      Promise.resolve({ data: mockResponse }),
    );

    const result = await service.getReservationTotalBill(reservationId);
    expect(result).toEqual(mockResponse);
  });

  it('should create individual bill', async () => {
    const billData = {
      id_user: 1,
      id_reservation: 1,
      date: '2021-10-10',
      total_bill: 100,
      bill_state: 'paid',
      id_ordered_dishes: [1, 2],
    };
    const mockResponse = {
      result: true,
      message: 'Individual bill created successfully',
      data: {
        id_reservation: 1,
        id_user: 1,
        total_bill: '50.00',
      },
    };
    spyOn(axios, 'post').and.returnValue(
      Promise.resolve({ data: mockResponse }),
    );

    const result = await service.createIndividualBill(billData);
    expect(result).toEqual(mockResponse);
  });

  it('should create equal bill', async () => {
    const billData = {
      id_user: 1,
      id_reservation: 1,
      date: '2021-10-10',
      total_bill: 100,
      bill_state: 'paid',
    };
    const mockResponse = {
      result: true,
      message: 'Equal bill created successfully',
      data: {
        id_reservation: 1,
        total_bill: '200.00',
      },
    };
    spyOn(axios, 'post').and.returnValue(
      Promise.resolve({ data: mockResponse }),
    );

    const result = await service.createEqualBill(billData);
    expect(result).toEqual(mockResponse);
  });

  it('should throw error on getReservationTotalBill', async () => {
    const reservationId = 1;
    const errorMessage = "Cannot read properties of undefined (reading 'data')";
    spyOn(axios, 'get').and.returnValue(
      Promise.reject({ message: errorMessage }),
    );

    try {
      await service.getReservationTotalBill(reservationId);
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });

  it('should throw error on createIndividualBill', async () => {
    const billData = {
      id_user: 1,
      id_reservation: 1,
      date: '2021-10-10',
      total_bill: 100,
      bill_state: 'paid',
      id_ordered_dishes: [1, 2],
    };
    const errorMessage = "Cannot read properties of undefined (reading 'data')";
    spyOn(axios, 'post').and.returnValue(
      Promise.reject({ message: errorMessage }),
    );

    try {
      await service.createIndividualBill(billData);
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });

  it('should throw error on createEqualBill', async () => {
    const billData = {
      id_user: 1,
      id_reservation: 1,
      date: '2021-10-10',
      total_bill: 100,
      bill_state: 'paid',
    };
    const errorMessage = "Cannot read properties of undefined (reading 'data')";
    spyOn(axios, 'post').and.returnValue(
      Promise.reject({ message: errorMessage }),
    );

    try {
      await service.createEqualBill(billData);
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });

  it('should throw error on getUserTotalBill', async () => {
    const reservationId = 1;
    const errorMessage = "Cannot read properties of undefined (reading 'data')";
    spyOn(axios, 'get').and.returnValue(
      Promise.reject({ message: errorMessage }),
    );

    try {
      await service.getUserTotalBill(reservationId);
    } catch (error: any) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});
