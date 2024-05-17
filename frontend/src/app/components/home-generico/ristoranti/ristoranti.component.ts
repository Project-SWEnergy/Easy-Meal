import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ristorante } from '../../../interfaces/ristoranti';
import { RouterModule } from '@angular/router';
import { IndirizzoComponent } from '../indirizzo/indirizzo.component';
import { TagCucinaComponent } from '../tag-cucina/tag-cucina.component';

@Component({
  selector: 'app-ristoranti',
  standalone: true,
  imports: [CommonModule, RouterModule, IndirizzoComponent, TagCucinaComponent],
  templateUrl: './ristoranti.component.html',
  styleUrls: ['./ristoranti.component.css'],
})
export class RistorantiComponent {
  @Input() ristoranti!: Ristorante[];
}
