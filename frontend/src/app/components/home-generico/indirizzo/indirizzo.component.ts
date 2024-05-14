import { Component, Input, OnInit } from '@angular/core';
import { Indirizzo } from '../../../interfaces/address';
import { IndirizzoService } from '../../../services/home-generico/indirizzo.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-indirizzo',
  templateUrl: './indirizzo.component.html',
  styleUrls: ['./indirizzo.component.css'],
})
export class IndirizzoComponent implements OnInit {
  @Input() ristoranteId: number | undefined;
  indirizzo: Indirizzo | undefined;

  constructor(private indirizzoService: IndirizzoService) {}

  ngOnInit() {
    if (this.ristoranteId) {
      this.getIndirizzoForRistorante(this.ristoranteId);
    }
  }

  async getIndirizzoForRistorante(id: number): Promise<void> {
    try {
      const indirizzo: Indirizzo | undefined =
        await this.indirizzoService.getAddressByRestaurantId(id);
      if (indirizzo) {
        this.indirizzo = indirizzo;
      } else {
      }
    } catch (error) {
      console.error("Errore durante il recupero dell'indirizzo:", error);
    }
  }
}
