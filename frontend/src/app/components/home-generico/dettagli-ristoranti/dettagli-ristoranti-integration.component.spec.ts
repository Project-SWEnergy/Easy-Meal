/*

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DettagliRistorantiComponent } from './dettagli-ristoranti.component';
import { OrariComponent } from '../orari/orari.component';
import { RistorantiService } from '../../../services/home-generico/ristoranti.service';
import { OrderService } from '../../../services/home-cliente/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { IndirizzoService } from '../../../services/home-generico/indirizzo.service';
import { Indirizzo } from '../../../interfaces/address';
import { Ristorante } from '../../../interfaces/ristoranti';
import { OrarioService } from '../../../services/home-generico/orario.service';
import { Dish } from '../../../interfaces/dish';
import { MenuService } from '../../../services/home-generico/menu.service';
import { Component, Input } from '@angular/core';
import { RecensioniService } from '../../../services/home-generico/recensioni.service';
import { Recensione } from '../../../interfaces/recensioni';

// Mock MenuComponent
@Component({
  selector: 'app-menu',
  template: '<div></div>',
})
class MockMenuComponent {
  @Input() ristoranteId: number | undefined;
}

// Mock RecensioniListComponent
@Component({
  selector: 'app-recensioni-list',
  template: '<div></div>',
})
class MockRecensioniListComponent {
  @Input() ristoranteId: number | undefined;
}

describe('DettagliRistorantiComponent (integrazione)', () => {
  let component: DettagliRistorantiComponent;
  let fixture: ComponentFixture<DettagliRistorantiComponent>;
  let ristorantiServiceSpy: jasmine.SpyObj<RistorantiService>;
  let orderServiceSpy: jasmine.SpyObj<OrderService>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let indirizzoServiceSpy: jasmine.SpyObj<IndirizzoService>;
  let orarioServiceSpy: jasmine.SpyObj<OrarioService>;
  let menuServiceSpy: jasmine.SpyObj<MenuService>;
  let recensioniServiceSpy: jasmine.SpyObj<RecensioniService>;

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

  beforeEach(waitForAsync(() => {
    const ristorantiServiceSpyObj = jasmine.createSpyObj('RistorantiService', [
      'getRestaurantById',
    ]);
    const orderServiceSpyObj = jasmine.createSpyObj('OrderService', [
      'didUserPaid',
    ]);
    const authServiceSpyObj = jasmine.createSpyObj('AuthService', ['isAuth']);
    const indirizzoServiceSpyObj = jasmine.createSpyObj('IndirizzoService', [
      'getAddressByRestaurantId',
    ]);
    const orarioServiceSpyObj = jasmine.createSpyObj('OrarioService', [
      'getOrariByRestaurantId',
    ]);
    const menuServiceSpyObj = jasmine.createSpyObj('MenuService', [
      'getMenuByRestaurantId',
    ]);
    const recensioniServiceSpyObj = jasmine.createSpyObj('RecensioniService', [
      'getReviewByRestaurantId',
    ]);

    menuServiceSpyObj.getMenuByRestaurantId.and.returnValue(
      Promise.resolve([]),
    );
    recensioniServiceSpyObj.getReviewByRestaurantId.and.returnValue(
      Promise.resolve([]),
    );

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: RistorantiService, useValue: ristorantiServiceSpyObj },
        { provide: OrderService, useValue: orderServiceSpyObj },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: of({ id: 1 }) } },
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
        { provide: AuthService, useValue: authServiceSpyObj },
        { provide: IndirizzoService, useValue: indirizzoServiceSpyObj },
        { provide: OrarioService, useValue: orarioServiceSpyObj },
        { provide: MenuService, useValue: menuServiceSpyObj },
        { provide: RecensioniService, useValue: recensioniServiceSpyObj },
      ],
      imports: [CommonModule],
    }).compileComponents();

    ristorantiServiceSpy = TestBed.inject(
      RistorantiService,
    ) as jasmine.SpyObj<RistorantiService>;
    orderServiceSpy = TestBed.inject(
      OrderService,
    ) as jasmine.SpyObj<OrderService>;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    indirizzoServiceSpy = TestBed.inject(
      IndirizzoService,
    ) as jasmine.SpyObj<IndirizzoService>;
    orarioServiceSpy = TestBed.inject(
      OrarioService,
    ) as jasmine.SpyObj<OrarioService>;
    menuServiceSpy = TestBed.inject(MenuService) as jasmine.SpyObj<MenuService>;
    recensioniServiceSpy = TestBed.inject(
      RecensioniService,
    ) as jasmine.SpyObj<RecensioniService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettagliRistorantiComponent);
    component = fixture.componentInstance;
  });

  it('should render the restaurant address using IndirizzoComponent', async () => {
    const mockIndirizzo: Indirizzo = {
      id: 1,
      city: 'Test City',
      street: 'Test Street',
      street_number: '123',
      state: 'Test State',
      zip_code: '12345',
    };

    ristorantiServiceSpy.getRestaurantById.and.returnValue(
      Promise.resolve(mockRistorante),
    );
    indirizzoServiceSpy.getAddressByRestaurantId.and.returnValue(
      Promise.resolve(mockIndirizzo),
    );

    await component.ngOnInit();

    fixture.detectChanges();

    // Attendi il completamento delle operazioni asincrone
    await fixture.whenStable();
    fixture.detectChanges();

    const indirizzoComponent =
      fixture.nativeElement.querySelector('app-indirizzo');

    expect(indirizzoComponent).toBeTruthy();
    expect(indirizzoServiceSpy.getAddressByRestaurantId).toHaveBeenCalledWith(
      mockRistorante.id,
    );
    expect(indirizzoComponent.textContent).toContain(
      `${mockIndirizzo.street} ${mockIndirizzo.street_number}, ${mockIndirizzo.city}`,
    );
  });

  it('should render the restaurant opening hours using OrariComponent', async () => {
    const mockOrari: any[] = [
      {
        id_day: 1,
        name: 'Lunedì',
        opening_time: '08:00',
        closing_time: '18:00',
      },
      {
        id_day: 2,
        name: 'Martedì',
        opening_time: '08:00',
        closing_time: '18:00',
      },
    ];

    ristorantiServiceSpy.getRestaurantById.and.returnValue(
      Promise.resolve(mockRistorante),
    );
    orarioServiceSpy.getOrariByRestaurantId.and.returnValue(
      Promise.resolve(mockOrari),
    );

    await component.ngOnInit();

    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const orariComponent = fixture.nativeElement.querySelector('app-orari');

    expect(orariComponent).toBeTruthy();
    expect(orarioServiceSpy.getOrariByRestaurantId).toHaveBeenCalledWith(
      mockRistorante.id,
    );
    expect(orariComponent.textContent).toContain(mockOrari[0].name);
    expect(orariComponent.textContent).toContain(mockOrari[1].name);
  });

  /*it('should integrate MenuComponent correctly', waitForAsync(() => {
    const mockRistoranteId = 1;
    const mockMenu: Dish[] = [
      { id: 1, id_restaurant: 1, name: 'Dish 1', description: 'Description 1', price: 10, image: 'dish1.jpg' },
      { id: 2, id_restaurant: 1, name: 'Dish 2', description: 'Description 2', price: 15, image: 'dish2.jpg' }
    ];

    ristorantiServiceSpy.getRestaurantById.and.returnValue(Promise.resolve(mockRistorante));
    menuServiceSpy.getMenuByRestaurantId.and.returnValue(Promise.resolve(mockMenu));

    component.ngOnInit();

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(menuServiceSpy.getMenuByRestaurantId).toHaveBeenCalledWith(mockRistorante.id);
      expect(component.ristorante).toBeDefined();
      expect(component.ristorante?.id).toEqual(mockRistorante.id);
    });
  }));*/

/*it('should integrate RecensioniListComponent correctly', waitForAsync(() => {
  const mockRistoranteId = 1;
  const mockRecensioni: Recensione[] = [
    { id_restaurant: 1, name_restaurant: 'Ristorante Test', id_user: 1, name_user: 'Utente Test', date: '2024-05-01', score: 9, description: 'Ottimo cibo!' }
  ];

  ristorantiServiceSpy.getRestaurantById.and.returnValue(Promise.resolve(mockRistorante));
  recensioniServiceSpy.getReviewByRestaurantId.and.returnValue(Promise.resolve(mockRecensioni));

  component.ngOnInit();

  fixture.detectChanges();

  fixture.whenStable().then(() => {
    fixture.detectChanges();

    expect(recensioniServiceSpy.getReviewByRestaurantId).toHaveBeenCalledWith(mockRistoranteId);
    expect(component.ristorante).toBeDefined();
    expect(component.ristorante?.id).toEqual(mockRistoranteId);
  });
}));*/
// });
