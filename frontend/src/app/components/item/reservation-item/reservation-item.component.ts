import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { Reservation } from '../../../interfaces/reservation';
import { MatCardModule } from '@angular/material/card';
import { OrderedDishesRistoratoreService } from '../../../services/ristoratore/ordered-dishes.ristoratore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservation-item',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './reservation-item.component.html',
  styleUrl: './reservation-item.component.css',
})
export class ReservationItemComponent {
  @Input() reservation: Reservation;
  dish_order = inject(OrderedDishesRistoratoreService);
  price: string;

  ngOnInit(): void {
    this.get_price();
  }

  ngOnChanges(_: SimpleChanges): void {
    this.get_price();
  }

  get_price(): void {
    this.dish_order.get_ordered_dishes(this.reservation.id).then((orders) => {
      this.price = this.dish_order.get_orders_price(orders);
    });
  }

  display_hh_mm(): string {
    return (
      this.reservation.date.substring(11, 13) +
      ':' +
      this.reservation.date.substring(14, 16)
    );
  }
}
