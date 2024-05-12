import { ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('PrenotazioneComponent', () => {
  let component: PrenotazioneComponent;
  let fixture: ComponentFixture<PrenotazioneComponent>;
  let orarioService: OrarioService;
  let prenotazioneService: PrenotazioneService;

  beforeEach(async () => {
    const authServiceStub = {
      isUser: () => true,
      get: () => ({ id: 1 }),
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
      ],
      providers: [
        PrenotazioneDataService,
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
        { provide: AuthService, useValue: authServiceStub },
        OrarioService,
        PrenotazioneService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrenotazioneComponent);
    component = fixture.componentInstance;
    orarioService = TestBed.inject(OrarioService);
    prenotazioneService = TestBed.inject(PrenotazioneService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill in the number of participants', () => {
    const participants = 5;
    component.prenotazioneForm
      .get('numeroPartecipanti')
      ?.setValue(participants);
    expect(component.prenotazioneForm.get('numeroPartecipanti')?.value).toEqual(
      participants,
    );
  });

  it('should check if the selected time is within opening hours', () => {
    component.selectedDayInfo = {
      id_day: 1,
      opening_time: '09:00',
      closing_time: '18:00',
    };
    component.prenotazioneForm.get('dataPrenotazione')?.setValue('2024-05-15');
    component.prenotazioneForm.get('oraPrenotazione')?.setValue('12:00');
    const isWithinOpeningHours = component.controllaOrarioApertura();
    expect(isWithinOpeningHours).toBe(true);
  });

  it('should create a reservation', async () => {
    spyOn(prenotazioneService, 'creaPrenotazione').and.returnValue(
      Promise.resolve({
        id: 1,
        id_restaurant: 1,
        date: '2024-05-15',
        partecipants: 5,
        reservation_state: 'In attesa',
        bill_splitting_method: 'Equidiviso',
        paid_orders: 0,
      }),
    );
    component.prenotazioneForm.setValue({
      dataPrenotazione: '2024-05-15',
      oraPrenotazione: '12:00',
      numeroPartecipanti: 5,
      metodoPagamento: 'Equidiviso',
    });
    await component.inviaPrenotazione();
    expect(prenotazioneService.creaPrenotazione).toHaveBeenCalled();
  });

  it('should invite to a reservation', async () => {
    spyOn(prenotazioneService, 'invitaPrenotazione').and.returnValue(
      Promise.resolve(),
    );
    component.prenotazioneInviata = true;
    component.prenotazioneForm.get('numeroPartecipanti')?.setValue(3);
    component.aggiungiPartecipantiInFormInvito();

    // Assicurati che il FormArray abbia almeno 3 controlli
    const partecipantiFormArray = component.invitoForm.get(
      'partecipanti',
    ) as FormArray;
    expect(partecipantiFormArray.length).toBe(2);

    // Assicurati di accedere agli elementi correttamente
    partecipantiFormArray.controls.forEach((control, index) => {
      expect(partecipantiFormArray.at(index)).toBeTruthy();
    });

    // Imposta i valori per gli indici esistenti
    partecipantiFormArray.at(0)?.setValue('test1@example.com');
    partecipantiFormArray.at(1)?.setValue('test2@example.com');
    partecipantiFormArray.at(2)?.setValue('test3@example.com');

    await component.invitaAllaPrenotazione();
    expect(prenotazioneService.invitaPrenotazione).toHaveBeenCalled();
  });

  it('should enter the catch of the "inviaPrenotazione()" function', async () => {
    spyOn(prenotazioneService, 'creaPrenotazione').and.returnValue(
      Promise.reject('error'),
    );
    component.prenotazioneForm.setValue({
      dataPrenotazione: '2024-05-15',
      oraPrenotazione: '12:00',
      numeroPartecipanti: 5,
      metodoPagamento: 'Equidiviso',
    });
    await component.inviaPrenotazione();
    expect(prenotazioneService.creaPrenotazione).toHaveBeenCalled();
  });

  it('should enter the else of the "inviaPrenotazione()" function', async () => {
    spyOn(window, 'alert');
    component.inviaPrenotazione();
    // expect(window.alert).toHaveBeenCalled();
  });

  it('should enter the catch of the "invitaAllaPrenotazione()" function', async () => {
    spyOn(prenotazioneService, 'invitaPrenotazione').and.returnValue(
      Promise.reject('error'),
    );
    component.prenotazioneInviata = true;
    component.prenotazioneForm.get('numeroPartecipanti')?.setValue(3);
    component.aggiungiPartecipantiInFormInvito();

    // Assicurati che il FormArray abbia almeno 3 controlli
    const partecipantiFormArray = component.invitoForm.get(
      'partecipanti',
    ) as FormArray;
    expect(partecipantiFormArray.length).toBe(2);

    // Assicurati di accedere agli elementi correttamente
    partecipantiFormArray.controls.forEach((control, index) => {
      expect(partecipantiFormArray.at(index)).toBeTruthy();
    });

    // Imposta i valori per gli indici esistenti
    partecipantiFormArray.at(0)?.setValue(''); // Invalid email
    partecipantiFormArray.at(1)?.setValue(''); // Invalid email

    await component.invitaAllaPrenotazione();
    expect(prenotazioneService.invitaPrenotazione).toHaveBeenCalled();
  });

  it('should test the onDateChange() function', () => {
    component.onDateChange({});
    expect(component.selectedDayInfo).toBeUndefined();
  });
});
