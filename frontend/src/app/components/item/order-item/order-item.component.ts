import { Component, Input, inject } from '@angular/core';
import { OrderedDishes } from '../../../interfaces/ordered-dishes';
import { MatCardModule } from '@angular/material/card';
import { OrderedDishesRistoratoreService } from '../../../services/ristoratore/ordered-dishes.ristoratore.service';
import { DishOrderedItemComponent } from '../dish-ordered-item/dish-ordered-item.component';

@Component({
  selector: 'app-order-item',
  standalone: true,
  imports: [MatCardModule, DishOrderedItemComponent],
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css',
})
export class OrderItemComponent {
  @Input() order: OrderedDishes[];

  price: string;
  ordered_dishes_service = inject(OrderedDishesRistoratoreService);

  ngOnInit(): void {
    // get the price of the order
    this.price = this.ordered_dishes_service.get_orders_price(this.order);
  }
}
