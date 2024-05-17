import { DettagliRistorantiComponent } from './dettagli-ristoranti.component';
import { RistorantiService } from '../../../services/home-generico/ristoranti.service';
import { OrderService } from '../../../services/home-cliente/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { Ristorante } from '../../../interfaces/ristoranti';
import { AuthService } from '../../../services/auth.service';

describe('DettagliRistorantiComponent', () => {
  let component: DettagliRistorantiComponent;
  let fixture: ComponentFixture<DettagliRistorantiComponent>;
  let ristorantiService: jasmine.SpyObj<RistorantiService>;
  let orderService: jasmine.SpyObj<OrderService>;
  let route: ActivatedRoute;
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;

  const mockRistorante: Ristorante = {
    id: 1,
    email: 'test@example.com',
    name: 'Test Ristorante',
    owner_name: 'Owner',
    owner_surname: 'Surname',
    id_address: 1,
    seats: 50,
    website: 'http://www.test.com',
    price_tier: 2,
    description: 'Test description',
    phone: '123456789',
    childrenn_seats: 10,
    accessibility: true,
    logo: 'logo.jpg',
    banner_image: 'banner.jpg',
  };

  beforeEach(async () => {
    const ristorantiServiceSpy = jasmine.createSpyObj('RistorantiService', [
      'getRestaurantById',
    ]);
    const orderServiceSpy = jasmine.createSpyObj('OrderService', [
      'didUserPaid',
    ]);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuth']);

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: RistorantiService, useValue: ristorantiServiceSpy },
        { provide: OrderService, useValue: orderServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: of({ id: 1 }) } },
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    }).compileComponents();

    ristorantiService = TestBed.inject(
      RistorantiService,
    ) as jasmine.SpyObj<RistorantiService>;
    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliRistorantiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load restaurant details on initialization', async () => {
    ristorantiService.getRestaurantById.and.returnValue(
      Promise.resolve(mockRistorante),
    );
    await component.ngOnInit();
    expect(component.ristorante).toEqual(mockRistorante);
  });

  it('should check user payment if authenticated', async () => {
    authService.isAuth.and.returnValue(true);
    orderService.didUserPaid.and.returnValue(Promise.resolve(true));

    await component.checkUserPayment(1);
    expect(component.userPaid).toBeFalse();
  });

  it('should not check user payment if not authenticated', async () => {
    authService.isAuth.and.returnValue(false);
    await component.checkUserPayment(1);
    expect(orderService.didUserPaid).not.toHaveBeenCalled();
  });

  it('should navigate to review page', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    const restaurantId = 1;
    component.goToReviewPage(restaurantId);
    expect(navigateSpy).toHaveBeenCalledWith(['/recensione', restaurantId]);
  });

  it('should handle error when loading restaurant details', async () => {
    const errorMessage = 'Error loading restaurant details';
    ristorantiService.getRestaurantById.and.returnValue(
      Promise.reject(errorMessage),
    );

    spyOn(console, 'error');

    await component.ngOnInit();
    await fixture.whenStable();

    expect(console.error).toHaveBeenCalledWith(
      'Errore durante il recupero del ristorante:',
      errorMessage,
    );
  });

  it('should navigate to reservation page', () => {
    const navigateSpy = router.navigate as jasmine.Spy;
    const restaurantId = 1;
    component.goToReservationPage(restaurantId);
    expect(navigateSpy).toHaveBeenCalledWith(['/prenota', restaurantId]);
  });
});
