import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ReservationItemComponent } from './reservation-item.component';
import { OrderedDishesRistoratoreService } from '../../../services/ristoratore/ordered-dishes.ristoratore.service';
import { Reservation } from '../../../interfaces/reservation';
import { OrderedDishes } from '../../../interfaces/ordered-dishes';

describe('ReservationItemComponent', () => {
  let component: ReservationItemComponent;
  let fixture: ComponentFixture<ReservationItemComponent>;
  let mockOrderedDishesService: jasmine.SpyObj<OrderedDishesRistoratoreService>;

  beforeEach(async () => {
    mockOrderedDishesService = jasmine.createSpyObj(
      'OrderedDishesRistoratoreService',
      ['get_ordered_dishes', 'get_orders_price'],
    );

    await TestBed.configureTestingModule({
      imports: [MatCardModule, ReservationItemComponent],
      providers: [
        {
          provide: OrderedDishesRistoratoreService,
          useValue: mockOrderedDishesService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch price on input change and calculate price correctly', async () => {
    const reservation: Reservation = {
      id: 123,
      date: '2021-10-15T12:00:00Z',
    } as Reservation;
    const orders = [{ id: 1 }, { id: 2 }] as OrderedDishes[];
    mockOrderedDishesService.get_ordered_dishes.and.returnValue(
      Promise.resolve(orders),
    );
    mockOrderedDishesService.get_orders_price.and.returnValue('25');

    component.reservation = reservation;
    fixture.detectChanges();

    await fixture.whenStable();

    expect(mockOrderedDishesService.get_ordered_dishes).toHaveBeenCalledWith(
      123,
    );
    expect(component.price).toEqual('25');
  });

  it('should display correct time from reservation date', () => {
    const orders = [{ id: 1 }, { id: 2 }] as OrderedDishes[];
    mockOrderedDishesService.get_ordered_dishes.and.returnValue(
      Promise.resolve(orders),
    );
    mockOrderedDishesService.get_orders_price.and.returnValue('25');

    component.reservation = {
      id: 123,
      date: '2021-10-15T14:30:00Z',
    } as Reservation;
    fixture.detectChanges();

    const time = component.display_hh_mm();
    expect(time).toEqual('14:30');
  });
});
