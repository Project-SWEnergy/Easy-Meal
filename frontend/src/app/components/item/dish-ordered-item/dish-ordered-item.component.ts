import { Component, Input } from '@angular/core';
import { OrderedDishes } from '../../../interfaces/ordered-dishes';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dish-ordered-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dish-ordered-item.component.html',
  styleUrl: './dish-ordered-item.component.css',
})
export class DishOrderedItemComponent {
  @Input() ordered_dish: OrderedDishes;
}
