import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { PagamentoComponent } from './pagamento.component';
import { OrderService } from '../../../services/home-cliente/order.service';
import { PagamentoService } from '../../../services/home-cliente/pagamento.service';
import { AuthService } from '../../../services/auth.service';
import { PrenotazioneDataService } from '../../../services/home-cliente/prenotazione-data-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PrenotazioneBill,
  ResultPrenotazioni,
} from '../../../interfaces/pagamento';

describe('PagamentoComponent', () => {
  let component: PagamentoComponent;
  let fixture: ComponentFixture<PagamentoComponent>;
  let orderService: jasmine.SpyObj<OrderService>;
  let pagamentoService: jasmine.SpyObj<PagamentoService>;
  let authService: jasmine.SpyObj<AuthService>;
  let prenotazioneDataService: jasmine.SpyObj<PrenotazioneDataService>;

  beforeEach(async () => {
    const authServiceStub = {
      isUser: () => true,
      get: () => ({ id: 1 }),
    };

    const orderServiceSpy = jasmine.createSpyObj('OrderService', [
      'getOrderedDishesByUser',
    ]);
    const pagamentoServiceSpy = jasmine.createSpyObj('PagamentoService', [
      'getUserTotalBill',
      'getReservationTotalBill',
      'createIndividualBill',
      'createEqualBill',
    ]);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isUser',
      'get',
    ]);
    const prenotazioneDataServiceSpy = jasmine.createSpyObj(
      'PrenotazioneDataService',
      ['getIdReservation', 'getBillSplittingMethod', 'getParticipants'],
    );

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: OrderService, useValue: orderServiceSpy },
        { provide: PagamentoService, useValue: pagamentoServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: AuthService, useValue: authServiceStub },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
        {
          provide: PrenotazioneDataService,
          useValue: prenotazioneDataServiceSpy,
        },
      ],
    }).compileComponents();

    orderService = TestBed.inject(OrderService) as jasmine.SpyObj<OrderService>;
    pagamentoService = TestBed.inject(
      PagamentoService,
    ) as jasmine.SpyObj<PagamentoService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    prenotazioneDataService = TestBed.inject(
      PrenotazioneDataService,
    ) as jasmine.SpyObj<PrenotazioneDataService>;

    // Imposta i valori di ritorno per i metodi getBillSplittingMethod e getParticipants
    prenotazioneDataService.getBillSplittingMethod.and.returnValue(
      'Individuale',
    );
    prenotazioneDataService.getParticipants.and.returnValue(2);

    // Imposta i valori di ritorno per i metodi getUserTotalBill e getReservationTotalBill
    pagamentoService.getUserTotalBill.and.returnValue(
      Promise.resolve({
        result: true,
        message: 'OK',
        data: [{ id_reservation: 1, id_user: 1, total_bill: '10' }],
      }),
    );
    pagamentoService.getReservationTotalBill.and.returnValue(
      Promise.resolve({
        result: true,
        message: 'OK',
        data: [{ id_reservation: 1, total_bill: '20' }],
      }),
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should handle equal payment', fakeAsync(() => {
    component.ngOnInit();
    tick(); // Attendiamo che le promesse vengano risolte
    fixture.detectChanges(); // Aggiorniamo la vista dopo che le promesse sono state risolte
    expect(prenotazioneDataService.getBillSplittingMethod).toHaveBeenCalled();
    expect(prenotazioneDataService.getParticipants).toHaveBeenCalled();
    tick();
    expect(component.individualUserTotalBill).toBe(10);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load ordered dishes', async () => {
    orderService.getOrderedDishesByUser.and.returnValue(Promise.resolve([]));
    await component.loadOrderedDishes(1);
    expect(orderService.getOrderedDishesByUser).toHaveBeenCalledWith(1);
  });

  it('should create individual bill', fakeAsync(() => {
    component.individualUserTotalBill = 10;
    pagamentoService.createIndividualBill.and.returnValue(
      Promise.resolve({ result: true, message: 'OK' }),
    );
    component.createIndividualBill();
    tick();
    expect(pagamentoService.createIndividualBill).toHaveBeenCalled();
  }));

  it('should create equal bill', fakeAsync(() => {
    component.individualUserTotalBill = 10;
    pagamentoService.createEqualBill.and.returnValue(
      Promise.resolve({ result: true, message: 'OK' }),
    );
    component.createEqualBill();
    tick();
    expect(pagamentoService.createEqualBill).toHaveBeenCalled();
  }));

  it('should handle payment', () => {
    component.bill_splitting = 'Individuale';
    component.createIndividualBill = jasmine
      .createSpy()
      .and.returnValue(Promise.resolve({ result: true, message: 'OK' }));
    component.effettuaPagamento();
    expect(component.createIndividualBill).toHaveBeenCalled();
  });

  it('should handle individual payment', fakeAsync(() => {
    component.ngOnInit();
    tick(); // Attendiamo che le promesse vengano risolte
    expect(prenotazioneDataService.getBillSplittingMethod).toHaveBeenCalled();
    expect(pagamentoService.getUserTotalBill).toHaveBeenCalled();
    expect(component.individualUserTotalBill).toBe(10);
  }));

  it('should handle individual payment error', fakeAsync(() => {
    pagamentoService.getUserTotalBill.and.returnValue(Promise.reject('Error'));
    component.ngOnInit();
    tick(); // Attendiamo che le promesse vengano risolte
    expect(prenotazioneDataService.getBillSplittingMethod).toHaveBeenCalled();
    expect(pagamentoService.getUserTotalBill).toHaveBeenCalled();
    expect(component.individualUserTotalBill).toBeUndefined();
  }));

  /**write a test that enters the catch present in the "loadOrderedDishes()" function */
  it('should handle load ordered dishes error', async () => {
    orderService.getOrderedDishesByUser.and.returnValue(
      Promise.reject('Error'),
    );
    await component.loadOrderedDishes(1);
    expect(orderService.getOrderedDishesByUser).toHaveBeenCalledWith(1);
  });

  it('should call loadOrderedDishes if reservationId is defined', () => {
    const reservationId = 1;
    spyOn(component, 'loadOrderedDishes');

    component.reservationId = reservationId;
    component.ngOnInit();

    expect(component.loadOrderedDishes).toHaveBeenCalledWith(reservationId);
  });

  it('should call pagamentoEquidiviso if bill_splitting is Equidiviso', () => {
    component.bill_splitting = 'Equidiviso';
    spyOn(component, 'pagamentoEquidiviso');

    component.ngOnInit();
    expect(component.pagamentoEquidiviso).toHaveBeenCalled();
  });

  it('should handle create equal bill error', fakeAsync(() => {
    pagamentoService.createEqualBill.and.returnValue(Promise.reject('Error'));
    component.createEqualBill();
    tick();
    expect(pagamentoService.createEqualBill).toHaveBeenCalled();
  }));

  it('should handle create individual bill error', fakeAsync(() => {
    pagamentoService.createIndividualBill.and.returnValue(
      Promise.reject('Error'),
    );
    component.createIndividualBill();
    tick();
    expect(pagamentoService.createIndividualBill).toHaveBeenCalled();
  }));

  /**write some tests that call the "equidiviso payment()" function and enter the then and catch of the function */
  it('should handle equidiviso payment', fakeAsync(() => {
    component.bill_splitting = 'Equidiviso';
    component.createEqualBill = jasmine
      .createSpy()
      .and.returnValue(Promise.resolve({ result: true, message: 'OK' }));
    component.effettuaPagamento();
    expect(component.createEqualBill).toHaveBeenCalled();
  }));

  it('should set individual and reservation total bill when promise is resolved', fakeAsync(() => {
    // Arrange
    const mockResult: ResultPrenotazioni<PrenotazioneBill[]> = {
      result: true,
      message: 'OK',
      data: [{ id_reservation: 1, total_bill: '20' }],
    };
    pagamentoService.getReservationTotalBill.and.returnValue(
      Promise.resolve(mockResult),
    );
    component.pagamentoEquidiviso();
    tick();

    expect(pagamentoService.getReservationTotalBill).toHaveBeenCalledWith(
      component.reservationId,
    );
    expect(component.reservationTotalBill).toBe(20);
    expect(component.individualUserTotalBill).toBe(10);
  }));

  it('should handle getReservationTotalBill error', fakeAsync(() => {
    pagamentoService.getReservationTotalBill.and.returnValue(
      Promise.reject('Error'),
    );
    component.pagamentoEquidiviso();
    tick();
    expect(pagamentoService.getReservationTotalBill).toHaveBeenCalled();
  }));
});
