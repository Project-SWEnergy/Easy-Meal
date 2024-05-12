import { Component, OnInit } from '@angular/core';
import { OrarioService } from '../../../services/home-generico/orario.service';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orari',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orari.component.html',
  styleUrl: './orari.component.css',
})
export class OrariComponent implements OnInit {
  orari: any[];
  @Input() ristoranteId: number | undefined;

  constructor(private orarioService: OrarioService) {}

  ngOnInit(): void {
    if (this.ristoranteId) {
      this.getOrariForRistorante(this.ristoranteId);
    }
  }

  async getOrariForRistorante(restaurantId: number): Promise<void> {
    try {
      const orari: any[] =
        await this.orarioService.getOrariByRestaurantId(restaurantId);
      console.log(orari);
      this.orari = orari;
    } catch (error) {
      console.error('Errore durante il recupero degli orari:', error);
    }
  }
}
