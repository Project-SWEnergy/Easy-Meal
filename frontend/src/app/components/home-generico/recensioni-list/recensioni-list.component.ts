import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Recensione } from '../../../interfaces/recensioni';
import { RecensioniService } from '../../../services/home-generico/recensioni.service';

@Component({
  selector: 'app-recensioni-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recensioni-list.component.html',
  styleUrl: './recensioni-list.component.css',
})
export class RecensioniListComponent {
  @Input() ristoranteId: number | undefined;
  recensioni: Recensione[] = [];

  constructor(private recensioneService: RecensioniService) {}

  ngOnInit(): void {
    if (this.ristoranteId) {
      this.loadRecensione(this.ristoranteId);
    }
  }

  async loadRecensione(ristoranteId: number): Promise<void> {
    try {
      const recensioni: Recensione[] =
        await this.recensioneService.getReviewByRestaurantId(ristoranteId);
      this.recensioni = recensioni;
    } catch (error) {
      console.error('Errore durante il caricamento delle recensioni:', error);
    }
  }
}
