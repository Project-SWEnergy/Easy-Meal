import { Component, inject } from '@angular/core';
import { Reservation } from '../../../interfaces/reservation';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationRistoratoreService } from '../../../services/ristoratore/reservation.ristoratore.service';
import { ReservationUpdateFormComponent } from '../../form/reservation-update-form/reservation-update-form.component';
import { OrderedIngredientItemComponent } from '../../item/ordered-ingredient-item/ordered-ingredient-item.component';
import { IngredientOrdered } from '../../../interfaces/ingredient';
import { OrderedDishes } from '../../../interfaces/ordered-dishes';
import { OrderItemComponent } from '../../item/order-item/order-item.component';
import { OrderedDishesRistoratoreService } from '../../../services/ristoratore/ordered-dishes.ristoratore.service';

@Component({
  selector: 'app-reservation-detail-ristoratore',
  standalone: true,
  imports: [
    ReservationUpdateFormComponent,
    OrderedIngredientItemComponent,
    OrderItemComponent,
  ],
  templateUrl: './reservation-detail-ristoratore.component.html',
  styleUrl: './reservation-detail-ristoratore.component.css',
})
export class ReservationDetailRistoratoreComponent {
  reservation: Reservation;
  ingredients: IngredientOrdered[];
  dish_orders: OrderedDishes[][];

  router = inject(ActivatedRoute);
  router_service = inject(Router);
  reservation_service = inject(ReservationRistoratoreService);
  ordered_dishes_service = inject(OrderedDishesRistoratoreService);

  async ngOnInit(): Promise<void> {
    const id = this.router.snapshot.paramMap.get('id');
    if (id === null) {
      // mostrare messaggio di errore
      return;
    }

    this.load_data(+id);
  }

  async load_data(res_id: number) {
    this.reservation = await this.reservation_service.get(res_id);

    this.ingredients =
      await this.reservation_service.get_ingredients_by_reservations([
        this.reservation.id,
      ]);

    this.dish_orders = await this.ordered_dishes_service
      .get_ordered_dishes(res_id)
      .then((res) => {
        return this.ordered_dishes_service.get_orders_grouped_by_user(res);
      });
  }

  onReservationChange() {
    this.load_data(this.reservation.id);
  }
}
