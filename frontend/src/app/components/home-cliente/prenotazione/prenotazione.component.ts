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
  orariApertura: any[] = [];
  selectedDayInfo: any;
  prenotazioneInviata: boolean = false;


  ms = inject(MessageService);

  constructor(
    private fb: FormBuilder,
    private orarioService: OrarioService,
    private prenotazioneService: PrenotazioneService,
    private route: ActivatedRoute,
    private router: Router,
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
      partecipanti: this.fb.group({}) // Inizializza il form group per i partecipanti
    });

    this.prenotazioneForm.get('numeroPartecipanti')?.valueChanges.subscribe(value => {
      this.updatePartecipantiControls(value);
    });

    const numeroPartecipantiControl = this.prenotazioneForm.get('numeroPartecipanti');
    if (numeroPartecipantiControl) {
      const numeroPartecipantiValue = numeroPartecipantiControl.value;
      this.updatePartecipantiControls(numeroPartecipantiValue); // Aggiorna i controlli dei partecipanti
    }
}

 updatePartecipantiControls(count: number): void {
    const partecipantiForm = this.prenotazioneForm.get('partecipanti') as FormGroup;

    // Rimuovi tutti i controlli esistenti prima di aggiungerne di nuovi
    Object.keys(partecipantiForm.controls).forEach(key => {
      partecipantiForm.removeControl(key);
    });

    for (let i = 0; i < count; i++) {
      partecipantiForm.addControl('partecipante' + i, this.fb.control('', Validators.email));
    }
}


  

async inviaPrenotazione(): Promise<void> {
  if (this.prenotazioneForm.valid) {
    const dataPrenotazione = this.prenotazioneForm.get('dataPrenotazione')?.value;
    const oraPrenotazione = this.prenotazioneForm.get('oraPrenotazione')?.value;
    const numeroPartecipanti = this.prenotazioneForm.get('numeroPartecipanti')?.value;
    const metodoPagamento = this.prenotazioneForm.get('metodoPagamento')?.value;

    const emails = [];
    for (let i = 0; i < numeroPartecipanti - 1; i++) {
      const controlName = 'partecipanti.partecipante' + i; // Accedi ai controlli dei partecipanti utilizzando i nomi dinamici
      const email = this.prenotazioneForm.get(controlName)?.value;
      emails.push(email);
    }

    const prenotazioneData = {
      restaurantId: this.idRestaurant,
      date: this.formatDate(dataPrenotazione, oraPrenotazione),
      partecipants: numeroPartecipanti,
      reservation_state: 'In attesa',
      bill_splitting_method: metodoPagamento,
    };

    const prenotazioneId = await this.prenotazioneService.creaPrenotazione(prenotazioneData);
    this.prenotazioneService
      .invitaPrenotazione(prenotazioneId, emails)
      .then(() => {
        this.ms.log('Inviti alla prenotazione inviati con successo');
        this.router.navigate(['/prenotazioni']);
      })
      .catch((error) => {
        this.ms.error('Errore durante l\'invio degli inviti alla prenotazione');
      });

  } else {
    this.ms.error('Compila tutti i campi correttamente.');
  }
}

  getPartecipantiArray(): number[] {
    const numeroPartecipanti = this.prenotazioneForm.get('numeroPartecipanti')?.value;
    return Array.from({ length: numeroPartecipanti }, (_, index) => index);
  }

   formatDate(date: string, time: string): string {
    const [hours, minutes] = time.split(':');
    const hoursUpdated = Number(hours);
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
    this.selectedDayInfo = this.orariApertura.find(
      (orario) => orario.id_day === selectedDay,
    );
  }
}
