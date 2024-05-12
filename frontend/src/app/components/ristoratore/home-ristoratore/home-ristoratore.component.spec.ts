import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HomeRistoratoreComponent } from './home-ristoratore.component';
import { ReservationRistoratoreService } from '../../../services/ristoratore/reservation.ristoratore.service';
import { Reservation, ReservationState } from '../../../interfaces/reservation';
import { AuthService } from '../../../services/auth.service';

describe('HomeRistoratoreComponent', () => {
  let component: HomeRistoratoreComponent;
  let fixture: ComponentFixture<HomeRistoratoreComponent>;
  let mockReservationService: jasmine.SpyObj<ReservationRistoratoreService>;
  let router: Router;
  let reservations: Reservation[];

  const authServiceMock = {
    get: jasmine
      .createSpy('get')
      .and.returnValue({ id: 1, role: 'restaurant' }), // Ensure this matches expected structure
  };

  beforeEach(waitForAsync(() => {
    mockReservationService = jasmine.createSpyObj(
      'ReservationRistoratoreService',
      ['get_all', 'get_ingredients_by_reservations', 'get_reservations_date'],
    );

    reservations = [
      {
        id: 3,
        date: '2023-05-10T15:00:00Z',
        reservation_state: ReservationState.Approvata,
      },
      {
        id: 1,
        date: '2023-05-10T12:00:00Z',
        reservation_state: ReservationState.InAttesa,
      },
      {
        id: 2,
        date: '2023-05-10T13:00:00Z',
        reservation_state: ReservationState.Concluso,
      },
    ] as Reservation[];

    TestBed.configureTestingModule({
      imports: [HomeRistoratoreComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: ReservationRistoratoreService,
          useValue: mockReservationService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeRistoratoreComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    // Setup mock initial data
    mockReservationService.get_all.and.returnValue(Promise.resolve([]));
    mockReservationService.get_ingredients_by_reservations.and.returnValue(
      Promise.resolve([]),
    );
    mockReservationService.get_reservations_date.and.returnValue({
      in_attesa: [],
      waiting: [],
      ended: [],
      canceled: [],
    });

    fixture.detectChanges(); // ngOnInit() is called
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with fetched reservations', async () => {
    const reservations = [
      {
        id: 1,
        date: new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000,
        ).toISOString(),
        reservation_state: ReservationState.InAttesa,
      },
    ] as Reservation[];
    mockReservationService.get_all.and.returnValue(
      Promise.resolve(reservations),
    );

    await component.ngOnInit();

    expect(component.reservations).toEqual(reservations);
    expect(mockReservationService.get_all).toHaveBeenCalled();
  });

  it('should navigate to reservation detail', () => {
    const reservationId = 1;
    component.goToReservationDetail(reservationId);
    expect(router.navigate).toHaveBeenCalledWith([
      'ristoratore/reservations/',
      reservationId,
    ]);
  });

  it('should update reservations on date change', async () => {
    const newDate = new Date('2023-05-10');
    spyOn(component, 'update').and.callThrough();

    component.onDateChange(newDate);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.date).toBe(newDate);
    expect(component.update).toHaveBeenCalled();
  });

  it('should sort reservations by time correctly', async () => {
    mockReservationService.get_all.and.returnValue(
      Promise.resolve(reservations),
    );
    component.date = new Date('2023-05-10');
    await component.update();
    component.sortType = 'time';
    component.onSortChange();
    expect(component.reservations.length).toBe(3);
    expect(component.reservations[0].id).toBe(1);
    expect(component.reservations[2].id).toBe(3);
  });

  it('should sort reservations by reservation-id correctly', async () => {
    mockReservationService.get_all.and.returnValue(
      Promise.resolve(reservations),
    );
    component.date = new Date('2023-05-10');
    await component.update();
    component.sortType = 'reservation-id';
    component.onSortChange();
    expect(component.reservations.length).toBe(3);
    expect(component.reservations[0].id).toBe(1);
    expect(component.reservations[2].id).toBe(3);
  });

  it('should sort reservations by status correctly', async () => {
    mockReservationService.get_all.and.returnValue(
      Promise.resolve(reservations),
    );
    component.date = new Date('2023-05-10');
    await component.update();
    component.sortType = 'status';
    component.onSortChange();
    expect(component.reservations.length).toBe(3);
    expect(component.reservations[0].reservation_state).toBe(
      ReservationState.InAttesa,
    );
    expect(component.reservations[1].reservation_state).toBe(
      ReservationState.Approvata,
    );
    expect(component.reservations[2].reservation_state).toBe(
      ReservationState.Concluso,
    );
  });

  it('should filter reservations by date correctly', async () => {
    mockReservationService.get_all.and.returnValue(
      Promise.resolve(reservations),
    );
    await component.update();
    component.date = new Date('2023-05-10');
    await component.filter_by_date(reservations);
    expect(component.reservations.length).toBe(3); // Assuming all reservations are on the same day for simplicity
  });

  it('should handle navigation to detail view', () => {
    component.goToReservationDetail(1);
    expect(router.navigate).toHaveBeenCalledWith([
      'ristoratore/reservations/',
      1,
    ]);
  });
});
