import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CarrelloComponent } from './carrello.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CarrelloService } from '../../../services/home-cliente/carrello.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('CarrelloComponent', () => {
  let component: CarrelloComponent;
  let fixture: ComponentFixture<CarrelloComponent>;
  let carrelloService: jasmine.SpyObj<CarrelloService>;
  let router: Router;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CarrelloService', [
      'getCarrello',
      'inviaOrdine',
      'cancellaOrdine',
      'clearCarrello',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: CarrelloService, useValue: spy },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy('navigate');
          },
        },
      ],
    }).compileComponents();

    carrelloService = TestBed.inject(
      CarrelloService,
    ) as jasmine.SpyObj<CarrelloService>;
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CarrelloComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch carrello on initialization', () => {
    const mockCarrello = [
      { id_dish: 1, dishName: 'Pizza', dishImage: 'pizza.jpg', dishPrice: 10 },
    ];
    carrelloService.getCarrello.and.returnValue(mockCarrello);

    component.ngOnInit();

    expect(component.carrello).toEqual(mockCarrello);
  });

  it('should send order successfully', fakeAsync(() => {
    const mockCarrello = [
      {
        id_dish: 1,
        dishName: 'Pizza',
        dishImage: 'pizza.jpg',
        dishPrice: 10,
        removed_ingredients: [],
      },
    ];
    const response = { success: true };
    spyOn(window, 'alert');

    carrelloService.inviaOrdine.and.returnValue(Promise.resolve(response));
    component.carrello = mockCarrello;
    component.id_reservation = 1;
    component.inviaOrdine();

    tick();

    expect(carrelloService.inviaOrdine).toHaveBeenCalledWith([
      { id_reservation: 1, id_dish: 1, removed_ingredients: [] },
    ]);
    // expect(window.alert).toHaveBeenCalledWith('Ordine inviato con successo');
  }));

  it('should handle order sending failure', fakeAsync(() => {
    const mockCarrello = [
      {
        id_dish: 1,
        dishName: 'Pizza',
        dishImage: 'pizza.jpg',
        dishPrice: 10,
        removed_ingredients: [],
      },
    ];
    const errorResponse = { message: 'Error sending order' };
    spyOn(window, 'alert');

    carrelloService.inviaOrdine.and.returnValue(Promise.reject(errorResponse));
    component.carrello = mockCarrello;
    component.id_reservation = 1;
    component.inviaOrdine();

    tick();

    expect(carrelloService.inviaOrdine).toHaveBeenCalledWith([
      { id_reservation: 1, id_dish: 1, removed_ingredients: [] },
    ]);
    // expect(window.alert).toHaveBeenCalledWith(
    //   "C'è stato un problema con l'invio dell'ordine",
    // );
  }));

  it('should delete order successfully', fakeAsync(() => {
    const response = { success: true };
    spyOn(window, 'alert');

    carrelloService.cancellaOrdine.and.returnValue(Promise.resolve(response));
    component.id_reservation = 1;
    component.cancellaOrdine();

    tick();

    expect(carrelloService.cancellaOrdine).toHaveBeenCalledWith(1);
    // expect(window.alert).toHaveBeenCalledWith('Ordine cancellato con successo');
  }));

  it('should handle order cancellation failure', fakeAsync(() => {
    const errorResponse = { message: 'Error cancelling order' };
    spyOn(window, 'alert');

    carrelloService.cancellaOrdine.and.returnValue(
      Promise.reject(errorResponse),
    );
    component.id_reservation = 1;
    component.cancellaOrdine();

    tick();

    expect(carrelloService.cancellaOrdine).toHaveBeenCalledWith(1);
    // expect(window.alert).toHaveBeenCalledWith(
    //   "C'è stato un problema con la cancellazione dell'ordine",
    // );
  }));
});
