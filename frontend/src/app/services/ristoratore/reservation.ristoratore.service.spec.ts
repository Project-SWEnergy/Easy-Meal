import { TestBed } from '@angular/core/testing';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../../../axios-config';
import { ReservationRistoratoreService } from './reservation.ristoratore.service';
import { MessageService } from '../lib/message.service';
import { OrderedDishesRistoratoreService } from './ordered-dishes.ristoratore.service';
import { IngredientRistoratoreService } from './ingredient.ristoratore.service';
import {
  BillSplittingMethod,
  Reservation,
  ReservationState,
  ReservationUpdate,
} from '../../interfaces/reservation';
import { UnitOfMeasurement } from '../../interfaces/ingredient';

describe('ReservationRistoratoreService', () => {
  let service: ReservationRistoratoreService;
  let mockAxios: MockAdapter;
  let mockMessageService: jasmine.SpyObj<MessageService>;
  let mockOrderedDishesService: jasmine.SpyObj<OrderedDishesRistoratoreService>;
  let mockIngredientService: jasmine.SpyObj<IngredientRistoratoreService>;

  beforeEach(() => {
    const spyMsg = jasmine.createSpyObj('MessageService', ['error', 'log']);
    const spyOds = jasmine.createSpyObj('OrderedDishesRistoratoreService', [
      'get_ordered_dishes',
      'get_ingredients_by_order',
    ]);
    const spyIng = jasmine.createSpyObj('IngredientRistoratoreService', [
      'get_all',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ReservationRistoratoreService,
        { provide: MessageService, useValue: spyMsg },
        { provide: OrderedDishesRistoratoreService, useValue: spyOds },
        { provide: IngredientRistoratoreService, useValue: spyIng },
      ],
    });

    service = TestBed.inject(ReservationRistoratoreService);
    mockAxios = new MockAdapter(axios);
    mockMessageService = TestBed.inject(
      MessageService,
    ) as jasmine.SpyObj<MessageService>;
    mockOrderedDishesService = TestBed.inject(
      OrderedDishesRistoratoreService,
    ) as jasmine.SpyObj<OrderedDishesRistoratoreService>;
    mockIngredientService = TestBed.inject(
      IngredientRistoratoreService,
    ) as jasmine.SpyObj<IngredientRistoratoreService>;
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get', () => {
    it('should return a reservation when successful', async () => {
      const mockReservation: Reservation = {
        id: 1,
        id_restaurant: 1,
        date: '2021-01-01',
        partecipants: 2,
        reservation_state: ReservationState.InAttesa,
        bill_splitting_method: BillSplittingMethod.Equidiviso,
        paid_orders: 0,
      };
      mockAxios
        .onGet('reservations/find-one/1')
        .reply(200, { result: true, data: [mockReservation] });

      const result = await service.get(1);
      expect(result).toEqual(mockReservation);
    });

    it('should handle errors', async () => {
      mockAxios.onGet('reservations/find-one/1').reply(200, { result: false });

      await service.get(1);
      expect(mockMessageService.error).toHaveBeenCalledWith(
        'Prenotazione non trovata'
      );
    });
  });

  // Tests for get_all
  describe('get_all', () => {
    it('should return all reservations when successful', async () => {
      const mockReservations: Reservation[] = [
        /* fill with expected data */
      ];
      mockAxios
        .onGet('reservations/find-all')
        .reply(200, { result: true, data: mockReservations });

      const result = await service.get_all();
      expect(result).toEqual(mockReservations);
    });

    it('should handle errors', async () => {
      mockAxios
        .onGet('reservations/find-all')
        .reply(200, { message: 'Error fetching all reservations' });

      try {
        await service.get_all();
        fail('The request should have failed');
      } catch (err) {
        expect(mockMessageService.error).toHaveBeenCalledWith(
          'Errore nel recupero delle prenotazioni'
        );
      }
    });
  });

  // Tests for update
  describe('update', () => {
    it('should confirm update on success', async () => {
      const update: ReservationUpdate = {
        partecipants: 2,
        reservation_state: ReservationState.InCorso,
        bill_splitting_method: BillSplittingMethod.Individuale,
      };
      mockAxios.onPatch('reservations/1').reply(200, {
        result: true,
        message: 'Reservation updated successfully',
      });

      const result = await service.update(update, 1);
      expect(result).toBeTrue();
      expect(mockMessageService.log).toHaveBeenCalledWith(
        'Prenotazione aggiornata con successo'
      );
    });

    it('should handle errors on update', async () => {
      const update: ReservationUpdate = {
        partecipants: 2,
        reservation_state: ReservationState.InCorso,
        bill_splitting_method: BillSplittingMethod.Individuale,
      };
      mockAxios
        .onPatch('reservations/1')
        .reply(200, { message: 'Update failed' });

      const result = await service.update(update, 1);
      expect(result).toBeFalse();
      expect(mockMessageService.error).toHaveBeenCalled();
    });
  });

  // Tests for get_ingredients_by_reservations
  describe('get_ingredients_by_reservations', () => {
    it('should return ingredients for multiple reservations', async () => {
      const resIds = [1];
      const orderedDishes = [
        {
          id: 1,
          id_ordered_dish: 1,
          id_user: 1,
          name_user: 'hello',
          surname_user: 'hello',
          id_reservation: 1,
          id_dish: 1,
          name_dish: 'carbonara',
          image_dish: 'carbonara.jpg',
          price_dish: 7,
          paid: false,
          removed_ingredients: [],
        },
        {
          id: 1,
          id_ordered_dish: 1,
          id_user: 1,
          name_user: 'hello',
          surname_user: 'hello',
          id_reservation: 1,
          id_dish: 1,
          name_dish: 'carbonara',
          image_dish: 'carbonara.jpg',
          price_dish: 7,
          paid: false,
          removed_ingredients: [],
        },
      ];
      const ingredients = [{ id_dish: 1, id_ingredient: 1, quantity: 100 }];
      mockOrderedDishesService.get_ordered_dishes.and.returnValues(
        Promise.resolve(orderedDishes),
      );
      mockOrderedDishesService.get_ingredients_by_order.and.returnValues(
        Promise.resolve(ingredients),
        Promise.resolve(ingredients),
      );

      mockIngredientService.get_all.and.returnValue(
        Promise.resolve([
          {
            id: 1,
            id_restaurant: 1,
            name: 'guanciale',
            unit_of_measurement: UnitOfMeasurement.g,
          },
        ]),
      );

      const result = await service.get_ingredients_by_reservations(resIds);
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('guanciale');
      expect(result[0].unit_of_measurement).toBe(UnitOfMeasurement.g);
      expect(result[0].quantity).toBe(200);
    });
  });

  describe('get_reservations_date', () => {
    it('should correctly categorize reservation dates based on their state', () => {
      // Example reservations data
      const reservations: Reservation[] = [
        {
          id: 1,
          date: '2024-05-10T12:00:00Z',
          reservation_state: ReservationState.InAttesa,
        },
        {
          id: 2,
          date: '2024-05-11T12:00:00Z',
          reservation_state: ReservationState.Approvata,
        },
        {
          id: 3,
          date: '2024-05-12T12:00:00Z',
          reservation_state: ReservationState.InCorso,
        },
        {
          id: 4,
          date: '2024-05-13T12:00:00Z',
          reservation_state: ReservationState.Pagamento,
        },
        {
          id: 5,
          date: '2024-05-14T12:00:00Z',
          reservation_state: ReservationState.Concluso,
        },
        {
          id: 6,
          date: '2024-05-15T12:00:00Z',
          reservation_state: ReservationState.Annullata,
        },
      ] as Reservation[];

      // Execute the method
      const categorizedDates = service.get_reservations_date(reservations);

      // Assertions to verify that each category contains the correct dates
      expect(categorizedDates.in_attesa).toEqual(['2024-05-10']);
      expect(categorizedDates.waiting).toEqual([
        '2024-05-11',
        '2024-05-12',
        '2024-05-13',
      ]);
      expect(categorizedDates.ended).toEqual(['2024-05-14']);
      expect(categorizedDates.canceled).toEqual(['2024-05-15']);

      // Check the length of each category to ensure no unexpected entries are present
      expect(categorizedDates.in_attesa.length).toBe(1);
      expect(categorizedDates.waiting.length).toBe(3);
      expect(categorizedDates.ended.length).toBe(1);
      expect(categorizedDates.canceled.length).toBe(1);
    });

    it('should handle empty reservations array', () => {
      const reservations: Reservation[] = [];

      // Execute the method
      const categorizedDates = service.get_reservations_date(reservations);

      // Check that all categories are empty
      expect(categorizedDates.in_attesa).toEqual([]);
      expect(categorizedDates.waiting).toEqual([]);
      expect(categorizedDates.ended).toEqual([]);
      expect(categorizedDates.canceled).toEqual([]);
    });

    it('should not repeat dates in categories', () => {
      // Reservations with the same date but different states
      const reservations: Reservation[] = [
        {
          id: 1,
          date: '2024-05-10T12:00:00Z',
          reservation_state: ReservationState.InAttesa,
        },
        {
          id: 2,
          date: '2024-05-10T14:00:00Z',
          reservation_state: ReservationState.InAttesa,
        }, // Same day as id: 1
        {
          id: 3,
          date: '2024-05-11T12:00:00Z',
          reservation_state: ReservationState.Concluso,
        },
        {
          id: 4,
          date: '2024-05-11T15:00:00Z',
          reservation_state: ReservationState.Concluso,
        }, // Same day as id: 3
      ] as Reservation[];

      // Execute the method
      const categorizedDates = service.get_reservations_date(reservations);

      // Ensure dates are not repeated within the same category
      expect(categorizedDates.in_attesa).toEqual(['2024-05-10']);
      expect(categorizedDates.ended).toEqual(['2024-05-11']);
    });
  });
});
