import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReservationDetailRistoratoreComponent } from './reservation-detail-ristoratore.component';
import { ReservationRistoratoreService } from '../../../services/ristoratore/reservation.ristoratore.service';
import { OrderedDishesRistoratoreService } from '../../../services/ristoratore/ordered-dishes.ristoratore.service';
import { Reservation } from '../../../interfaces/reservation';
import { IngredientOrdered } from '../../../interfaces/ingredient';
import { OrderedDishes } from '../../../interfaces/ordered-dishes';

describe('ReservationDetailRistoratoreComponent', () => {
  let component: ReservationDetailRistoratoreComponent;
  let fixture: ComponentFixture<ReservationDetailRistoratoreComponent>;
  let mockReservationService: jasmine.SpyObj<ReservationRistoratoreService>;
  let mockOrderedDishesService: jasmine.SpyObj<OrderedDishesRistoratoreService>;
  let activatedRoute: ActivatedRoute;

  beforeEach(waitForAsync(() => {
    mockReservationService = jasmine.createSpyObj(
      'ReservationRistoratoreService',
      ['get', 'get_ingredients_by_reservations'],
    );
    mockOrderedDishesService = jasmine.createSpyObj(
      'OrderedDishesRistoratoreService',
      ['get_ordered_dishes', 'get_orders_grouped_by_user'],
    );

    TestBed.configureTestingModule({
      imports: [ReservationDetailRistoratoreComponent],
      providers: [
        {
          provide: ReservationRistoratoreService,
          useValue: mockReservationService,
        },
        {
          provide: OrderedDishesRistoratoreService,
          useValue: mockOrderedDishesService,
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationDetailRistoratoreComponent);
    component = fixture.componentInstance;
  }));

  it('should create and load data', waitForAsync(() => {
    const reservationData = { id: 1 } as Reservation;
    const ingredientsData = [{ id: 1, name: 'Tomato' }] as IngredientOrdered[];
    const dishOrdersData = [[{ id: 1 }]] as OrderedDishes[][];

    mockReservationService.get.and.returnValue(
      Promise.resolve(reservationData),
    );
    mockReservationService.get_ingredients_by_reservations.and.returnValue(
      Promise.resolve(ingredientsData),
    );
    mockOrderedDishesService.get_ordered_dishes.and.returnValue(
      Promise.resolve([]),
    );
    mockOrderedDishesService.get_orders_grouped_by_user.and.returnValue(
      dishOrdersData,
    );

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.reservation).toEqual(reservationData);
      expect(component.ingredients).toEqual(ingredientsData);
      expect(component.dish_orders).toEqual(dishOrdersData);
      expect(mockReservationService.get).toHaveBeenCalledWith(1);
    });
  }));
});
