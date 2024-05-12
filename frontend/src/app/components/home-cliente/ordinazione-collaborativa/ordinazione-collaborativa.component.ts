import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { CarrelloComponent } from '../carrello/carrello.component';
import { OrderListComponent } from '../order-list/order-list.component';
import { PrenotazioneDataService } from '../../../services/home-cliente/prenotazione-data-service.service';

@Component({
  selector: 'app-ordinazione-collaborativa',
  standalone: true,
  imports: [MenuComponent, CarrelloComponent, OrderListComponent],
  templateUrl: './ordinazione-collaborativa.component.html',
  styleUrl: './ordinazione-collaborativa.component.css',
})
export class OrdinazioneCollaborativaComponent {
  idReservation: number;
  idRestaurant: number;

  constructor(private prenotazioneDataService: PrenotazioneDataService) {
    this.idReservation = this.prenotazioneDataService.getIdReservation();
    this.idRestaurant = this.prenotazioneDataService.getIdRestaurant();
  }
}
