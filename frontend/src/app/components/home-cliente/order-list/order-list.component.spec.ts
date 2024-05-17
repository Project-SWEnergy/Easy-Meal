import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { OrderListComponent } from './order-list.component';
import { OrderService } from '../../../services/home-cliente/order.service';
import { CommonModule } from '@angular/common';
import { OrderedDish } from '../../../interfaces/order';

describe('OrderListComponent', () => {
  let component: OrderListComponent;
  let fixture: ComponentFixture<OrderListComponent>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;

  beforeEach(waitForAsync(() => {
    orderServiceSpy = jasmine.createSpyObj('OrderService', [
      'getOrderedDishesByReservation',
    ]);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule],
      providers: [{ provide: OrderService, useValue: orderServiceSpy }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error when loading ordered dishes', async () => {
    const reservationId = 1;
    const errorMessage = 'Error loading ordered dishes';
    orderServiceSpy.getOrderedDishesByReservation.and.returnValue(
      Promise.reject(errorMessage),
    );

    // Spy on console.error to check if it's called with the correct error message
    spyOn(console, 'error');

    component.reservationId = reservationId;
    await component.loadOrderedDishes(reservationId);

    expect(orderServiceSpy.getOrderedDishesByReservation).toHaveBeenCalledWith(
      reservationId,
    );

    // Wait for async tasks to complete before checking console.error
    await fixture.whenStable();

    // Check if console.error was called with the correct error message
    expect(console.error).toHaveBeenCalledWith(
      'Errore nel caricamento dei piatti ordinati:',
      errorMessage,
    );
  });

  it('should load ordered dishes when reservationId is provided', async () => {
    const reservationId = 1;
    const mockOrderedDishes: OrderedDish[] = [
      {
        id: 1,
        id_ordered_dish: 1,
        id_user: 1,
        name_user: 'John',
        surname_user: 'Doe',
        id_reservation: reservationId,
        id_dish: 1,
        name_dish: 'Pizza',
        image_dish: 'pizza.jpg',
        price_dish: 10,
        paid: true,
        removed_ingredients: [],
      },
    ];
    orderServiceSpy.getOrderedDishesByReservation.and.returnValue(
      Promise.resolve(mockOrderedDishes),
    );

    component.reservationId = reservationId;
    await component.loadOrderedDishes(reservationId);

    expect(orderServiceSpy.getOrderedDishesByReservation).toHaveBeenCalledWith(
      reservationId,
    );
    expect(component.orderedDishes).toEqual(mockOrderedDishes);
  });

  it('should update user list when ordered dishes are loaded', async () => {
    const reservationId = 1;
    const mockOrderedDishes: OrderedDish[] = [
      {
        id: 1,
        id_ordered_dish: 1,
        id_user: 1,
        name_user: 'John',
        surname_user: 'Doe',
        id_reservation: reservationId,
        id_dish: 1,
        name_dish: 'Pizza',
        image_dish: 'pizza.jpg',
        price_dish: 10,
        paid: true,
        removed_ingredients: [],
      },
    ];
    orderServiceSpy.getOrderedDishesByReservation.and.returnValue(
      Promise.resolve(mockOrderedDishes),
    );

    component.reservationId = reservationId;
    await component.loadOrderedDishes(reservationId);

    expect(component.userList.length).toEqual(1);
    expect(component.userList[0].id_user).toEqual(mockOrderedDishes[0].id_user);
    expect(component.userList[0].name_user).toEqual(
      mockOrderedDishes[0].name_user,
    );
    expect(component.userList[0].surname_user).toEqual(
      mockOrderedDishes[0].surname_user,
    );
  });

  it('should return ordered dishes by user', () => {
    const mockOrderedDishes: OrderedDish[] = [
      {
        id: 1,
        id_ordered_dish: 1,
        id_user: 1,
        name_user: 'John',
        surname_user: 'Doe',
        id_reservation: 1,
        id_dish: 1,
        name_dish: 'Pizza',
        image_dish: 'pizza.jpg',
        price_dish: 10,
        paid: true,
        removed_ingredients: [],
      },
      {
        id: 2,
        id_ordered_dish: 2,
        id_user: 2,
        name_user: 'Jane',
        surname_user: 'Doe',
        id_reservation: 1,
        id_dish: 2,
        name_dish: 'Pasta',
        image_dish: 'pasta.jpg',
        price_dish: 12,
        paid: true,
        removed_ingredients: [],
      },
      {
        id: 3,
        id_ordered_dish: 3,
        id_user: 1,
        name_user: 'John',
        surname_user: 'Doe',
        id_reservation: 1,
        id_dish: 3,
        name_dish: 'Salad',
        image_dish: 'salad.jpg',
        price_dish: 8,
        paid: true,
        removed_ingredients: [],
      },
    ];
    component.orderedDishes = mockOrderedDishes;

    const userId = 1;
    const orderedDishesByUser = component.getOrderedDishesByUser(userId);

    expect(orderedDishesByUser.length).toEqual(2);
    expect(orderedDishesByUser[0].id_user).toEqual(userId);
    expect(orderedDishesByUser[1].id_user).toEqual(userId);
  });

  it('should refresh ordered dishes when reservationId is provided', async () => {
    const reservationId = 1;
    const mockOrderedDishes: OrderedDish[] = [
      {
        id: 1,
        id_ordered_dish: 1,
        id_user: 1,
        name_user: 'John',
        surname_user: 'Doe',
        id_reservation: reservationId,
        id_dish: 1,
        name_dish: 'Pizza',
        image_dish: 'pizza.jpg',
        price_dish: 10,
        paid: true,
        removed_ingredients: [],
      },
    ];
    orderServiceSpy.getOrderedDishesByReservation.and.returnValue(
      Promise.resolve(mockOrderedDishes),
    );

    component.reservationId = reservationId;
    await component.refreshOrderedDishes();

    expect(orderServiceSpy.getOrderedDishesByReservation).toHaveBeenCalledWith(
      reservationId,
    );
    expect(component.orderedDishes).toEqual(mockOrderedDishes);
  });
});
