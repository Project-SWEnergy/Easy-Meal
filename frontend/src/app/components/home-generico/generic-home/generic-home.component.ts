import { Component } from '@angular/core';
import { Ristorante } from '../../../interfaces/ristoranti';
import { RistorantiService } from '../../../services/home-generico/ristoranti.service';
import { CommonModule } from '@angular/common';
import { RistorantiComponent } from '../ristoranti/ristoranti.component';

@Component({
  selector: 'app-generic-home',
  standalone: true,
  imports: [CommonModule, RistorantiComponent],
  templateUrl: './generic-home.component.html',
  styleUrl: './generic-home.component.css',
})
export class GenericHomeComponent {
  ristorantiList: Ristorante[] = [];
  filteredRistorantiList: Ristorante[] = [];

  constructor(private ristorantiService: RistorantiService) {
    this.fetchRistoranti();
  }

  async fetchRistoranti() {
    try {
      const result = await this.ristorantiService.getAllRestaurants();
      if (result) {
        this.ristorantiList = result;
        console.log('OLEEE SONO I RISTORANTI: ' + this.ristorantiList);
        this.filteredRistorantiList = result;
      } else {
        console.error('Errore: dati dei ristoranti non disponibili');
      }
    } catch (error) {
      console.error('Errore durante il recupero dei ristoranti:', error);
    }
  }

  filterResultsByName(text: string) {
    if (!text) {
      this.filteredRistorantiList = this.ristorantiList;
      return;
    }

    this.filteredRistorantiList = this.ristorantiList.filter((ristorante) =>
      ristorante?.name.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
