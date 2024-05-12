import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { PrenotazioniListComponent } from './prenotazioni-list.component';
import { PrenotazioneService } from '../../../services/home-cliente/prenotazione.service';
import { PrenotazioneDataService } from '../../../services/home-cliente/prenotazione-data-service.service';
import { Router } from '@angular/router';
import { FindPrenotazioni } from '../../../interfaces/prenotazione';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('PrenotazioniListComponent', () => {
  let component: PrenotazioniListComponent;
  let fixture: ComponentFixture<PrenotazioniListComponent>;
  let prenotazioneServiceSpy: jasmine.SpyObj<PrenotazioneService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let prenotazioneDataService: PrenotazioneDataService;

  const mockPrenotazioni: FindPrenotazioni[] = [
    {
      id_user: 1,
      name_user: 'John',
      surname_user: 'Doe',
      id_reservation: 123,
      id_restaurant: 456,
      name_restaurant: 'Restaurant A',
      date: '2024-05-10',
      partecipants: 2,
      state: 'Confirmed',
      bill_splitting_method: 'Equal',
      accepted: true,
    },
    {
      id_user: 2,
      name_user: 'Jane',
      surname_user: 'Doe',
      id_reservation: 124,
      id_restaurant: 457,
      name_restaurant: 'Restaurant B',
      date: '2024-05-12',
      partecipants: 3,
      state: 'Pending',
      bill_splitting_method: 'Itemized',
      accepted: false,
    },
  ];

  beforeEach(async () => {
    const prenotazioneServiceSpyObj = jasmine.createSpyObj(
      'PrenotazioneService',
      ['findPrenotazioniByUser', 'deletePrenotazione', 'acceptPrenotazione'],
    );
    const router = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: PrenotazioneService, useValue: prenotazioneServiceSpyObj },
        { provide: Router, useValue: router },
        PrenotazioneDataService,
      ],
      imports: [RouterTestingModule],
    }).compileComponents();
    prenotazioneServiceSpy = TestBed.inject(
      PrenotazioneService,
    ) as jasmine.SpyObj<PrenotazioneService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    prenotazioneDataService = TestBed.inject(PrenotazioneDataService);
    fixture = TestBed.createComponent(PrenotazioniListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPrenotazioni on ngOnInit', fakeAsync(() => {
    prenotazioneServiceSpy.findPrenotazioniByUser.and.returnValue(
      Promise.resolve(mockPrenotazioni),
    );

    component.ngOnInit();
    tick();

    expect(component.prenotazioni).toEqual(mockPrenotazioni);
    expect(prenotazioneServiceSpy.findPrenotazioniByUser).toHaveBeenCalled();
  }));

  it('should return user reservations on success', fakeAsync(() => {
    prenotazioneServiceSpy.findPrenotazioniByUser.and.returnValue(
      Promise.resolve(mockPrenotazioni),
    );

    component.getPrenotazioni();
    tick(); // Aspetta che tutte le Promises pendenti vengano risolte

    expect(component.prenotazioni).toEqual(mockPrenotazioni);
    expect(prenotazioneServiceSpy.findPrenotazioniByUser).toHaveBeenCalled();
  }));

  /*
  it('should handle error on getPrenotazioni', async () => {
    const error = 'Errore nel recupero delle prenotazioni';
    spyOn(console, 'error');

    prenotazioneServiceSpy.findPrenotazioniByUser.and.returnValue(
      Promise.reject(error),
    );

    await component.getPrenotazioni();
    await fixture.whenStable();
    expect(component.prenotazioni.length).toBe(0);
    expect(console.error).toHaveBeenCalledWith(
      'Errore durante il recupero delle prenotazioni:',
      error,
    );
  });
  */

  it('should delete a reservation', fakeAsync(() => {
    const idReservationToDelete = 123; // ID della prenotazione da cancellare
    prenotazioneServiceSpy.deletePrenotazione.and.returnValue(
      Promise.resolve(),
    ); // Simuliamo il successo della cancellazione

    component.cancellaPrenotazione(idReservationToDelete);
    tick(); // Aspettiamo che tutte le Promises pendenti vengano risolte

    expect(prenotazioneServiceSpy.deletePrenotazione).toHaveBeenCalledWith(
      idReservationToDelete,
    );
  }));

  it('should call deletePrenotazione function', () => {
    const idReservationToDelete = 123; // ID della prenotazione da cancellare
    prenotazioneServiceSpy.deletePrenotazione.and.returnValue(
      Promise.resolve(),
    ); // Simuliamo il successo della cancellazione

    component.cancellaPrenotazione(idReservationToDelete);

    expect(prenotazioneServiceSpy.deletePrenotazione).toHaveBeenCalledWith(
      idReservationToDelete,
    );
  });

  it('should confirm a reservation', fakeAsync(() => {
    const idReservationToConfirm = 123; // ID della prenotazione da confermare
    prenotazioneServiceSpy.acceptPrenotazione.and.returnValue(
      Promise.resolve(),
    ); // Simuliamo il successo della conferma

    component.confermaPrenotazione(idReservationToConfirm);
    tick(); // Aspettiamo che tutte le Promises pendenti vengano risolte

    expect(prenotazioneServiceSpy.acceptPrenotazione).toHaveBeenCalledWith(
      idReservationToConfirm,
    );
  }));

  it('should call acceptPrenotazione function', () => {
    const idReservationToConfirm = 123; // ID della prenotazione da confermare
    prenotazioneServiceSpy.acceptPrenotazione.and.returnValue(
      Promise.resolve(),
    ); // Simuliamo il successo della conferma

    component.confermaPrenotazione(idReservationToConfirm);

    expect(prenotazioneServiceSpy.acceptPrenotazione).toHaveBeenCalledWith(
      idReservationToConfirm,
    );
  });

  it('should set data in PrenotazioneDataService and navigate to OrdinazioneCollaborativa', () => {
    const id_restaurant = 456;
    const idReservation = 123;
    spyOn(prenotazioneDataService, 'setIdReservation');

    component.navigateToOrdinazioneCollaborativa(idReservation, id_restaurant);

    expect(prenotazioneDataService.setIdReservation).toHaveBeenCalledWith(
      idReservation,
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/ordinazione-collaborativa',
    ]);
  });

  it('should set data in PrenotazioneDataService and navigate to Pagamento', () => {
    const idReservation = 123;
    const bill_splitting = 'Equal';
    const partecipants = 2;
    spyOn(prenotazioneDataService, 'setIdReservation');
    spyOn(prenotazioneDataService, 'setBillSplittingMethod');
    spyOn(prenotazioneDataService, 'setParticipants');

    component.navigateToPagamento(idReservation, bill_splitting, partecipants);

    expect(prenotazioneDataService.setIdReservation).toHaveBeenCalledWith(
      idReservation,
    );
    expect(prenotazioneDataService.setBillSplittingMethod).toHaveBeenCalledWith(
      bill_splitting,
    );
    expect(prenotazioneDataService.setParticipants).toHaveBeenCalledWith(
      partecipants,
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pagamento']);
  });

  it('should test buttons', fakeAsync(() => {
    const idReservationToDelete = 123;
    const idReservationToConfirm = 123;
    const id_restaurant = 456;
    const idReservation = 123;
    const bill_splitting = 'Equal';
    const partecipants = 2;
    prenotazioneServiceSpy.deletePrenotazione.and.returnValue(
      Promise.resolve(),
    );
    prenotazioneServiceSpy.acceptPrenotazione.and.returnValue(
      Promise.resolve(),
    );

    component.cancellaPrenotazione(idReservationToDelete);
    tick();

    component.confermaPrenotazione(idReservationToConfirm);
    tick();

    component.navigateToOrdinazioneCollaborativa(idReservation, id_restaurant);
    component.navigateToPagamento(idReservation, bill_splitting, partecipants);

    expect(prenotazioneServiceSpy.deletePrenotazione).toHaveBeenCalledWith(
      idReservationToDelete,
    );
    expect(prenotazioneServiceSpy.acceptPrenotazione).toHaveBeenCalledWith(
      idReservationToConfirm,
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith([
      '/ordinazione-collaborativa',
    ]);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/pagamento']);
  }));
});
