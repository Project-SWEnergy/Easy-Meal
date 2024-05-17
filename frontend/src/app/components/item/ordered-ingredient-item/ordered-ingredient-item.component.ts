import { Component, Input } from '@angular/core';
import { IngredientOrdered } from '../../../interfaces/ingredient';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-ordered-ingredient-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './ordered-ingredient-item.component.html',
  styleUrl: './ordered-ingredient-item.component.css',
})
export class OrderedIngredientItemComponent {
  @Input() ingredient: IngredientOrdered;
}
