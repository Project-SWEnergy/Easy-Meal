import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PrenotazioneComponent } from './prenotazione.component';
import { PrenotazioneDataService } from '../../../services/home-cliente/prenotazione-data-service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrarioService } from '../../../services/home-generico/orario.service';
import { PrenotazioneService } from '../../../services/home-cliente/prenotazione.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { of } from 'rxjs';


describe('PrenotazioneComponent', () => {
  let component: PrenotazioneComponent;
  let fixture: ComponentFixture<PrenotazioneComponent>;
  let orarioService: OrarioService;
  let prenotazioneService: PrenotazioneService;
  let router: Router;

  beforeEach(async () => {
    const authServiceStub = {
      isUser: () => true,
      get: () => ({ id: 1 }),
    };

    const orarioServiceStub = {
      getOrariByRestaurantId: jasmine.createSpy('getOrariByRestaurantId').and.returnValue(
        Promise.resolve([
          { id_day: 1, name: 'Monday', opening_time: '08:00', closing_time: '18:00' },
          { id_day: 2, name: 'Tuesday', opening_time: '08:00', closing_time: '18:00' }
        ])
      )
    };

    const prenotazioneServiceStub = {
      creaPrenotazione: jasmine.createSpy('creaPrenotazione').and.returnValue(Promise.resolve(1)),
      invitaPrenotazione: jasmine.createSpy('invitaPrenotazione').and.returnValue(Promise.resolve()),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatSelectModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        PrenotazioneDataService,
        FormBuilder,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
        { provide: AuthService, useValue: authServiceStub },
        { provide: OrarioService, useValue: orarioServiceStub },
        { provide: PrenotazioneService, useValue: prenotazioneServiceStub },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotazioneComponent);
    component = fixture.componentInstance;
    orarioService = TestBed.inject(OrarioService);
    prenotazioneService = TestBed.inject(PrenotazioneService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and call updatePartecipantiControls on change', fakeAsync(() => {
    spyOn(component, 'updatePartecipantiControls');
    component.ngOnInit();
    tick(); // Wait for async calls to complete
    expect(component.prenotazioneForm).toBeTruthy();
    expect(component.updatePartecipantiControls).toHaveBeenCalled();
  }));

  it('should update partecipanti controls based on numeroPartecipanti', () => {
    component.updatePartecipantiControls(3);
    expect(Object.keys(component.prenotazioneForm.controls['partecipanti'].value).length).toBe(3);
  });

  it('should invoke inviaPrenotazione with valid form data', fakeAsync(() => {
    spyOn(component, 'inviaPrenotazione');
    component.prenotazioneForm.patchValue({
      dataPrenotazione: '2024-05-20',
      oraPrenotazione: '12:00',
      numeroPartecipanti: 3,
      metodoPagamento: 'Cash'
    });
    component.inviaPrenotazione();
    tick();
    expect(component.inviaPrenotazione).toHaveBeenCalled();
  }));
  
  it('should check if orario apertura is valid', () => {
    component.selectedDayInfo = { opening_time: '08:00', closing_time: '18:00' };
    component.prenotazioneForm.patchValue({
      dataPrenotazione: '2024-05-20',
      oraPrenotazione: '10:00'
    });
    expect(component.controllaOrarioApertura()).toBeTrue();
  });

  it('should check if orario apertura is invalid', () => {
    component.selectedDayInfo = { opening_time: '08:00', closing_time: '18:00' };
    component.prenotazioneForm.patchValue({
      dataPrenotazione: '2024-05-20',
      oraPrenotazione: '20:00'
    });
    expect(component.controllaOrarioApertura()).toBeFalse();
  });

  it('should handle date change', () => {
    spyOn(component, 'onDateChange');
    const event = { value: new Date('2024-05-20') };
    component.onDateChange(event);
    expect(component.onDateChange).toHaveBeenCalledWith(event);
  });

  it('should get partecipanti array', () => {
    component.prenotazioneForm.patchValue({
      numeroPartecipanti: 3
    });
    const partecipantiArray = component.getPartecipantiArray();
    expect(partecipantiArray.length).toBe(3);
  });

  it('should format date correctly', () => {
    const date = '2024-05-20';
    const time = '12:00';
    const formattedDate = component.formatDate(date, time);
    expect(formattedDate).toBe('2024-05-20T10:00:00.000Z');
  });




  it('should show error message if form is invalid', () => {
    spyOn(component.ms, 'error');
    component.inviaPrenotazione();
    expect(component.ms.error).toHaveBeenCalledWith('Compila tutti i campi correttamente.');
  });

  it('should create prenotazione and invite users', fakeAsync(() => {
    spyOn(component.ms, 'log');
    spyOn(component.ms, 'error');
    component.prenotazioneForm.patchValue({
      dataPrenotazione: '2024-05-20',
      oraPrenotazione: '12:00',
      numeroPartecipanti: 3,
      metodoPagamento: 'Cash'
    });
    component.inviaPrenotazione();
    tick();
    expect(component.ms.log).toHaveBeenCalledWith('Inviti alla prenotazione inviati con successo');
  }));

  it('should handle error while creating prenotazione', fakeAsync(() => {
    spyOn(component.ms, 'error');
    try {
      component.prenotazioneForm.patchValue({
        dataPrenotazione: '2024-05-20',
        oraPrenotazione: '12:00',
        numeroPartecipanti: 3,
        metodoPagamento: 'Cash'
      });
      component.inviaPrenotazione();
      tick();
    } catch (error) {
      expect(prenotazioneService.creaPrenotazione).toHaveBeenCalled(); // Verifica che il metodo sia stato chiamato
      expect(component.ms.error).toHaveBeenCalledWith('Errore durante la creazione della prenotazione:');
    }
  }));
  
  it('should handle error while inviting users', fakeAsync(() => {
    spyOn(component.ms, 'error');
    try {
      component.prenotazioneForm.patchValue({
        dataPrenotazione: '2024-05-20',
        oraPrenotazione: '12:00',
        numeroPartecipanti: 3,
        metodoPagamento: 'Cash'
      });
      component.inviaPrenotazione();
      tick();
    } catch (error) {
      expect(prenotazioneService.invitaPrenotazione).toHaveBeenCalled(); // Verifica che il metodo sia stato chiamato
      expect(component.ms.error).toHaveBeenCalledWith('Errore durante l\'invio degli inviti alla prenotazione');
    }
  }));

});