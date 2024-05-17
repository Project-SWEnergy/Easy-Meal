import { Component, OnInit, inject } from '@angular/core';
import { PrenotazioneService } from '../../../services/home-cliente/prenotazione.service';
import { FindPrenotazioni } from '../../../interfaces/prenotazione';
import { CommonModule } from '@angular/common';
import { PrenotazioneDataService } from '../../../services/home-cliente/prenotazione-data-service.service';
import { Router } from '@angular/router';
import { MessageService } from '../../../services/lib/message.service';

@Component({
  selector: 'app-prenotazioni-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prenotazioni-list.component.html',
  styleUrl: './prenotazioni-list.component.css',
})
export class PrenotazioniListComponent implements OnInit {
  prenotazioni: FindPrenotazioni[] = [];

  ms = inject(MessageService);

  constructor(
    private prenotazioneService: PrenotazioneService,
    private prenotazioneDataService: PrenotazioneDataService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getPrenotazioni();
  }

  getPrenotazioni(): void {
    // Chiamata al service per ottenere le prenotazioni dell'utente
    this.prenotazioneService
      .findPrenotazioniByUser()
      .then((prenotazioni) => {
        this.prenotazioni = prenotazioni;
      })
      .catch((error) => {
        console.error('Errore durante il recupero delle prenotazioni:', error);
      });
  }

  async cancellaPrenotazione(idReservation: number): Promise<void> {
    try {
      await this.prenotazioneService.deletePrenotazione(idReservation);
      this.ms.log('Prenotazione cancellata con successo');
      await this.getPrenotazioni();
    } catch (error) {
      this.ms.error('Errore durante la cancellazione della prenotazione');
    }
  }
  async confermaPrenotazione(idReservation: number): Promise<void> {
    try {
      await this.prenotazioneService.acceptPrenotazione(idReservation);
      this.ms.log('Prenotazione accettata con successo');
      await this.getPrenotazioni();
    } catch (error) {
      this.ms.error("Errore durante l'accettazione della prenotazione");
    }
  }

  navigateToOrdinazioneCollaborativa(
    idReservation: number,
    idRestaurant: number,
  ): void {
    // Imposta i valori nel servizio PrenotazioneDataService
    this.prenotazioneDataService.setIdReservation(idReservation);
    this.prenotazioneDataService.setIdRestaurant(idRestaurant);
    // Naviga alla pagina OrdinazioneCollaborativaComponent
    this.router.navigate(['/ordinazione-collaborativa']);
  }

  navigateToPagamento(
    idReservation: number,
    bill_splitting: string,
    partecipants: number,
  ): void {
    // Imposta i valori nel servizio PrenotazioneDataService
    this.prenotazioneDataService.setIdReservation(idReservation);
    this.prenotazioneDataService.setBillSplittingMethod(bill_splitting);
    this.prenotazioneDataService.setParticipants(partecipants);
    // Naviga alla pagina OrdinazioneCollaborativaComponent
    this.router.navigate(['/pagamento']);
  }
}
