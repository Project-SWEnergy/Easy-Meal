import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import {
  BillSplittingMethod,
  Reservation,
  ReservationState,
} from '../../../interfaces/reservation';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { ReservationRistoratoreService } from '../../../services/ristoratore/reservation.ristoratore.service';
import { ReservationItemComponent } from '../../item/reservation-item/reservation-item.component';

@Component({
  selector: 'app-reservation-update-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    AsyncPipe,
    ReservationItemComponent,
  ],
  templateUrl: './reservation-update-form.component.html',
  styleUrl: './reservation-update-form.component.css',
})
export class ReservationUpdateFormComponent {
  @Input() reservation: Reservation;
  @Output() onChange = new EventEmitter<void>();

  selected = false;
  form: FormGroup;
  reservation_states = Object.values(ReservationState);
  bill_splitting_methods = Object.values(BillSplittingMethod);

  reservation_service = inject(ReservationRistoratoreService);

  ngOnInit(): void {
    console.log(this.reservation);
    this.form = new FormGroup({
      partecipants: new FormControl(
        { value: this.reservation.partecipants, disabled: true },
        [Validators.required, Validators.min(1)],
      ),
      reservation_state: new FormControl(
        this.reservation.reservation_state,
        Validators.required,
      ),
      bill_splitting_method: new FormControl(
        { value: this.reservation.bill_splitting_method, disabled: true },
        Validators.required,
      ),
    });
  }

  send_form() {
    if (!this.form.valid) {
      return;
    }

    this.reservation_service
      .update(this.form.value, this.reservation.id)
      .then((res) => {
        if (res) {
          this.selected = false;
          this.onChange.emit();
        }
      });
  }
}
