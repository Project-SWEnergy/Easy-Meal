import { Component, inject } from '@angular/core';
import { ReservationItemComponent } from '../../item/reservation-item/reservation-item.component';
import { ReservationRistoratoreService } from '../../../services/ristoratore/reservation.ristoratore.service';
import { Reservation } from '../../../interfaces/reservation';
import { OrderedIngredientItemComponent } from '../../item/ordered-ingredient-item/ordered-ingredient-item.component';
import { IngredientOrdered } from '../../../interfaces/ingredient';
import { CalendarRistoratoreComponent } from './calendar-ristoratore/calendar-ristoratore.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-ristoratore',
  standalone: true,
  imports: [
    ReservationItemComponent,
    OrderedIngredientItemComponent,
    CalendarRistoratoreComponent,
    MatButtonToggleModule,
    FormsModule,
  ],
  templateUrl: './home-ristoratore.component.html',
  styleUrl: './home-ristoratore.component.css',
})
export class HomeRistoratoreComponent {
  reservation_service = inject(ReservationRistoratoreService);
  router = inject(Router);

  reservations: Reservation[];
  ingredients: IngredientOrdered[];
  reservations_dates: {
    in_attesa: string[];
    waiting: string[];
    ended: string[];
    canceled: string[];
  };
  sortType: 'time' | 'status' | 'reservation-id' = 'time';
  date: Date;

  async ngOnInit(): Promise<void> {
    this.date = new Date();
    this.date = new Date(
      this.date.getTime() - this.date.getTimezoneOffset() * 60 * 1000,
    );

    await this.update();
  }

  /** Updates the view:
   * 1. Filters the reservations by date
   * 2. Updates the ingredients based on the reservations
   */
  async update() {
    // get all the reservations
    const reservations = await this.reservation_service.get_all();

    // filter the reservations by date
    await this.filter_by_date(reservations);

    // sort the reservations
    this.onSortChange();

    // update the ingredients based on the reservations
    this.ingredients =
      await this.reservation_service.get_ingredients_by_reservations(
        this.reservations.map((res) => res.id),
      );

    // update the reservations dates
    this.reservations_dates =
      this.reservation_service.get_reservations_date(reservations);
  }

  /** Sort the reservations by the this.sortType param */
  onSortChange() {
    // sort by time
    if (this.sortType === 'time') {
      this.reservations.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    }

    // sort by reservation id
    if (this.sortType === 'reservation-id') {
      this.reservations.sort((a, b) => a.id - b.id);
    }

    // sort by status
    const customSortOrder = [
      'In attesa',
      'Approvata',
      'In corso',
      'Pagamento',
      'Conclusa',
      'Rifiutata',
      'Annullata',
    ];

    if (this.sortType === 'status') {
      this.reservations.sort((a, b) => {
        return (
          customSortOrder.indexOf(a.reservation_state) -
          customSortOrder.indexOf(b.reservation_state)
        );
      });
    }
  }

  /** Update the this.date field, with the value passed
   * @param date the new date
   *
   * it is used to get the date from the calendar component
   */
  onDateChange(date: Date) {
    this.date = date;
    this.update();
  }

  /** Filters the reservations based on the this.date params */
  async filter_by_date(reservations: Reservation[]) {
    this.reservations = reservations.filter((res) => {
      const selected_date = this.date.toISOString().split('T')[0];
      const res_date = res.date.split('T')[0];
      return selected_date === res_date;
    });
  }

  goToReservationDetail(res_id: number) {
    this.router.navigate(['ristoratore/reservations/', res_id]);
  }
}
