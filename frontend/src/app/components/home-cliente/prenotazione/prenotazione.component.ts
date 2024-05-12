import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormArray, FormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { OrarioService } from '../../../services/home-generico/orario.service';
import { PrenotazioneService } from '../../../services/home-cliente/prenotazione.service';
import { MessageService } from '../../../services/lib/message.service';

@Component({
  selector: 'app-prenotazione',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatOption,
    MatSelectModule,
  ],
  templateUrl: './prenotazione.component.html',
  styleUrls: ['./prenotazione.component.css'],
})
export class PrenotazioneComponent implements OnInit {
  idRestaurant: number;
  prenotazioneForm: FormGroup;
  invitoForm: FormGroup;
  orariApertura: any[] = [];
  selectedDayInfo: any;
  prenotazioneInviata: boolean = false;

  ms = inject(MessageService);

  constructor(
    private fb: FormBuilder,
    private orarioService: OrarioService,
    private prenotazioneService: PrenotazioneService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idRestaurant = Number(this.route.snapshot.params['id']);
    this.orarioService
      .getOrariByRestaurantId(this.idRestaurant)
      .then((orari) => {
        this.orariApertura = orari;
      });

    this.prenotazioneForm = this.fb.group({
      dataPrenotazione: ['', Validators.required],
      oraPrenotazione: ['', Validators.required],
      numeroPartecipanti: ['', [Validators.required, Validators.min(1)]],
      metodoPagamento: ['', Validators.required],
    });

    this.invitoForm = this.fb.group({
      partecipanti: this.fb.array([]),
    });

    // Inizializzazione form invito con un campo email per ciascun partecipante
  }

  inviaPrenotazione(): void {
    if (this.prenotazioneForm.valid) {
      const dataPrenotazione =
        this.prenotazioneForm.get('dataPrenotazione')?.value;
      const oraPrenotazione =
        this.prenotazioneForm.get('oraPrenotazione')?.value;
      const numeroPartecipanti =
        this.prenotazioneForm.get('numeroPartecipanti')?.value;
      const metodoPagamento =
        this.prenotazioneForm.get('metodoPagamento')?.value;

      const prenotazioneData = {
        restaurantId: this.idRestaurant,
        date: this.formatDate(dataPrenotazione, oraPrenotazione),
        partecipants: numeroPartecipanti,
        reservation_state: 'In attesa',
        bill_splitting_method: metodoPagamento,
      };
      console.log('Dati della prenotazione:', prenotazioneData);

      this.prenotazioneService
        .creaPrenotazione(prenotazioneData)
        .then((response) => {
          this.ms.log('Prenotazione inviata con successo');
          this.prenotazioneInviata = true;
          this.aggiungiPartecipantiInFormInvito();
        })
        .catch((error) => {
          this.ms.error('Errore durante l\'invio della prenotazione');
        });
    } else {
      this.ms.error('Compila tutti i campi correttamente.');
    }
  }

  aggiungiPartecipantiInFormInvito(): void {
    const numeroPartecipanti =
      this.prenotazioneForm.get('numeroPartecipanti')?.value;
    for (let i = 1; i < numeroPartecipanti; i++) {
      this.partecipanti.push(this.fb.control('', Validators.email));
    }
  }

  invitaAllaPrenotazione(): void {
    const emails = this.invitoForm.value.partecipanti;
    console.log('Emails degli invitati:', emails);
    this.prenotazioneService
      .invitaPrenotazione(emails)
      .then(() => {
        this.ms.log('Inviti alla prenotazione inviati con successo');
      })
      .catch((error) => {
        this.ms.error('Errore durante l\'invio degli inviti alla prenotazione');
      });
  }

  get partecipanti() {
    return this.invitoForm.get('partecipanti') as FormArray;
  }

  private formatDate(date: string, time: string): string {
    const [hours, minutes] = time.split(':');
    const hoursUpdated = Number(hours) + 2;
    const formattedDate = new Date(date);
    formattedDate.setHours(Number(hoursUpdated), Number(minutes), 0, 0);
    return formattedDate.toISOString();
  }

  controllaOrarioApertura(): boolean {
    const dataPrenotazione =
      this.prenotazioneForm.get('dataPrenotazione')?.value;
    const oraPrenotazione = this.prenotazioneForm.get('oraPrenotazione')?.value;

    if (dataPrenotazione && oraPrenotazione && this.selectedDayInfo) {
      const openingTime = this.selectedDayInfo.opening_time;
      const closingTime = this.selectedDayInfo.closing_time;

      return oraPrenotazione >= openingTime && oraPrenotazione <= closingTime;
    }

    return false;
  }

  onDateChange(event: any): void {
    const selectedDate = event.value;
    let selectedDay = new Date(selectedDate).getDay();
    if (selectedDay === 0) {
      selectedDay = 7;
    }
    console.log('Giorno selezionato:', selectedDay);
    this.selectedDayInfo = this.orariApertura.find(
      (orario) => orario.id_day === selectedDay,
    );
    console.log('Informazioni sul giorno selezionato:', this.selectedDayInfo);
  }
}
