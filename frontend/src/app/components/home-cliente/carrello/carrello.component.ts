import { Component, OnInit, inject } from '@angular/core';
import { CarrelloService } from '../../../services/home-cliente/carrello.service';
import { CommonModule } from '@angular/common';
import { Input } from '@angular/core';
import { MessageService } from '../../../services/lib/message.service';

@Component({
  selector: 'app-carrello',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrello.component.html',
  styleUrl: './carrello.component.css',
})
export class CarrelloComponent implements OnInit {
  carrello: any[] = [];
  @Input() id_reservation: number;

  ms = inject(MessageService)

  constructor(private carrelloService: CarrelloService) { }

  ngOnInit(): void {
    this.carrello = this.carrelloService.getCarrello();
  }

  inviaOrdine(): void {
    const carrelloDaInviare = this.carrello.map((item) => ({
      id_reservation: this.id_reservation,
      id_dish: item.id_dish,
      removed_ingredients: item.removed_ingredients,
    }));

    this.carrelloService
      .inviaOrdine(carrelloDaInviare)
      .then((response) => {
        this.ms.log('Ordine inviato con successo');
      })
      .catch((error) => {
        this.ms.error('Errore durante l\'invio dell\'ordine');
      });
  }

  cancellaOrdine(): void {
    this.carrelloService
      .cancellaOrdine(this.id_reservation)
      .then((response) => {
        this.ms.log('Ordine cancellato con successo');
      })
      .catch((error) => {
        this.ms.error('Errore durante la cancellazione dell\'ordine');
      });
  }
}
