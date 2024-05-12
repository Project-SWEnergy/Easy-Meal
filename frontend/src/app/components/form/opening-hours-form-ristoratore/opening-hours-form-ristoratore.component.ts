import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { WeekDaysRistoratoreService } from '../../../services/ristoratore/week-days.ristoratore.service';
import { Weekday } from '../../../interfaces/weekday';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-opening-hours-form-ristoratore',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    AsyncPipe,
    MatCardModule,
  ],
  templateUrl: './opening-hours-form-ristoratore.component.html',
  styleUrl: './opening-hours-form-ristoratore.component.css',
})
export class OpeningHoursFormRistoratoreComponent {
  weekday_service = inject(WeekDaysRistoratoreService);
  openings_form = new FormArray<FormGroup>([]);
  weekdays: Weekday[];
  filtered_weekdays: Observable<Weekday[]>;

  hour_form = new FormGroup({
    id_day: new FormControl('', Validators.required),
    opening_time: new FormControl('', [
      Validators.pattern('[0-2][0-9]:[[0-5][0-9]'),
      Validators.required,
    ]),
    closing_time: new FormControl('', [
      Validators.pattern('[0-2][0-9]:[[0-5][0-9]'),
      Validators.required,
    ]),
  });

  @Output() onChange = new EventEmitter<FormArray>();

  async ngOnInit() {
    this.weekdays = await this.weekday_service.get();

    this.filtered_weekdays = this.hour_form.controls[
      'id_day'
    ].valueChanges.pipe(
      startWith(''),
      map((value: string | null | Weekday) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : this.weekdays;
      }),
    );
  }

  displayFn(ing: Weekday): string {
    return ing && ing.name ? ing.name : '';
  }

  private _filter(name: string): Weekday[] {
    const filterValue = name.toLowerCase();
    return this.weekdays.filter((day) => {
      return day.name.toLowerCase().includes(filterValue);
    });
  }

  add_hour() {
    if (!this.hour_form.valid) {
      return;
    }

    const hour = new FormGroup({
      id_day: new FormControl(this.hour_form.get('id_day')!.value, [
        Validators.min(1),
        Validators.max(7),
      ]),
      opening_time: new FormControl(
        this.hour_form.get('opening_time')!.value,
        Validators.pattern('[0-2][0-9]:[0-5][0-9]'),
      ),
      closing_time: new FormControl(
        this.hour_form.get('closing_time')!.value,
        Validators.pattern('[0-2][0-9]:[0-5][0-9]'),
      ),
    });

    this.openings_form.push(hour);
    this.hour_form.reset();
    this.onChange.emit(this.openings_form);
  }

  remove_hour(index: number) {
    this.openings_form.removeAt(index);
    this.onChange.emit(this.openings_form);
  }
}
