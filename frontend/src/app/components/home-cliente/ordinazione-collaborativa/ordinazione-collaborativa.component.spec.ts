import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdinazioneCollaborativaComponent } from './ordinazione-collaborativa.component';
import { PrenotazioneDataService } from '../../../services/home-cliente/prenotazione-data-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { By } from '@angular/platform-browser';
import { MenuComponent } from '../menu/menu.component';
import { CarrelloComponent } from '../carrello/carrello.component';
import { OrderListComponent } from '../order-list/order-list.component';

describe('OrdinazioneCollaborativaComponent', () => {
  let component: OrdinazioneCollaborativaComponent;
  let fixture: ComponentFixture<OrdinazioneCollaborativaComponent>;
  let prenotazioneDataService: PrenotazioneDataService;

  beforeEach(async () => {
    const authServiceStub = {
      isUser: () => true, // Simuliamo che l'utente sia autenticato e sia un utente standard
      get: () => ({ id: 1 }), // Simuliamo un utente con un id valido
    };

    const idReservation = 123;
    const idRestaurant = 456;

    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        PrenotazioneDataService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
        { provide: AuthService, useValue: authServiceStub }, // Utilizziamo il service stub
      ],
    }).compileComponents();

    prenotazioneDataService = TestBed.inject(PrenotazioneDataService);
    spyOn(prenotazioneDataService, 'getIdReservation').and.returnValue(
      idReservation,
    );
    spyOn(prenotazioneDataService, 'getIdRestaurant').and.returnValue(
      idRestaurant,
    );
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdinazioneCollaborativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set idReservation and idRestaurant from PrenotazioneDataService', () => {
    expect(component.idReservation).toEqual(123);
    expect(component.idRestaurant).toEqual(456);
  });

  it('should render child components', () => {
    const menuComponent = fixture.debugElement.query(
      By.directive(MenuComponent),
    );
    const carrelloComponent = fixture.debugElement.query(
      By.directive(CarrelloComponent),
    );
    const orderListComponent = fixture.debugElement.query(
      By.directive(OrderListComponent),
    );

    expect(menuComponent).toBeTruthy();
    expect(carrelloComponent).toBeTruthy();
    expect(orderListComponent).toBeTruthy();
  });
});
