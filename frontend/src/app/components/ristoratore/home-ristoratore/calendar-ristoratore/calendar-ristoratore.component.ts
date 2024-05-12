import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-calendar-ristoratore',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  templateUrl: './calendar-ristoratore.component.html',
  styleUrl: './calendar-ristoratore.component.css',
})
export class CalendarRistoratoreComponent {
  selected: Date;
  @Input() reservations_dates: {
    in_attesa: string[];
    waiting: string[];
    ended: string[];
    canceled: string[];
  };
  @Output() dateChange = new EventEmitter<Date>();
  dateClass: (date: Date) => string;
  dateFilter: (date: Date) => boolean;

  constructor() {
    this.selected = new Date();
  }

  ngOnInit(): void {
    this.dateClass = (date: Date) => {
      let date_string = this._date_to_string(date);

      if (this.reservations_dates.in_attesa.includes(date_string)) {
        return 'in-attesa';
      } else if (this.reservations_dates.waiting.includes(date_string)) {
        return 'waiting';
      } else if (this.reservations_dates.ended.includes(date_string)) {
        return 'ended';
      }
      return '';
    };

    this.dateFilter = (date: Date) => {
      const dates = this.reservations_dates.in_attesa.concat(
        this.reservations_dates.waiting,
        this.reservations_dates.ended,
        this.reservations_dates.canceled,
      );
      const date_string = this._date_to_string(date);
      return dates.includes(date_string);
    };
  }

  private _date_to_string(date: Date): string {
    let actual_date = new Date(date);
    actual_date.setDate(actual_date.getDate() + 1);
    return actual_date.toISOString().substring(0, 10);
  }

  onDateChange() {
    if (this.selected) {
      this.selected.setTime(
        this.selected.valueOf() - this.selected.getTimezoneOffset() * 60 * 1000,
      );
      this.dateChange.emit(this.selected);
    }
  }
}
