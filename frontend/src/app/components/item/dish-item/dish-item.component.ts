import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Dish } from '../../../interfaces/dish';

@Component({
  selector: 'app-dish-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dish-item.component.html',
  styleUrl: './dish-item.component.css',
})
export class DishItemComponent {
  @Input() dish: Dish;
}
