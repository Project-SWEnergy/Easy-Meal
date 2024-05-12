import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormArray, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { WeekDaysRistoratoreService } from '../../../services/ristoratore/week-days.ristoratore.service';
import { OpeningHoursFormRistoratoreComponent } from './opening-hours-form-ristoratore.component';
import { Observable, of } from 'rxjs';
import { Weekday } from '../../../interfaces/weekday';
import { provideRouter } from '@angular/router';

describe('OpeningHoursFormRistoratoreComponent', () => {
  let component: OpeningHoursFormRistoratoreComponent;
  let fixture: ComponentFixture<OpeningHoursFormRistoratoreComponent>;
  let mockWeekDaysRistoratoreService: jasmine.SpyObj<WeekDaysRistoratoreService>;

  beforeEach(async () => {
    mockWeekDaysRistoratoreService = jasmine.createSpyObj(
      'WeekDaysRistoratoreService',
      ['get'],
    );
    await TestBed.configureTestingModule({
      imports: [
        OpeningHoursFormRistoratoreComponent,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatCardModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: WeekDaysRistoratoreService,
          useValue: mockWeekDaysRistoratoreService,
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OpeningHoursFormRistoratoreComponent);
    component = fixture.componentInstance;
    mockWeekDaysRistoratoreService.get.and.returnValue(
      Promise.resolve([
        { id: 1, name: 'Monday', abbreviation: 'Mon', order: 1 },
        { id: 2, name: 'Tuesday', abbreviation: 'Tue', order: 2 },
      ]),
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load weekdays and initialize filter on init', async () => {
    await fixture.whenStable();
    expect(component.weekdays.length).toBe(2);
    expect(component.filtered_weekdays instanceof Observable).toBeTruthy();
  });

  it('should add a new hour to openings_form if hour_form is valid', () => {
    component.hour_form.setValue({
      id_day: 'Lunedì',
      opening_time: '10:00',
      closing_time: '22:00',
    });
    component.add_hour();
    expect(component.openings_form.length).toBe(1);
  });

  it('should not add a new hour if hour_form is invalid', () => {
    component.hour_form.setValue({
      id_day: '',
      opening_time: '26:00',
      closing_time: '22:00',
    });
    component.add_hour();
    expect(component.openings_form.length).toBe(0);
  });

  it('should emit onChange event when hour is added', () => {
    spyOn(component.onChange, 'emit');
    component.hour_form.setValue({
      id_day: 'Lunedì',
      opening_time: '10:00',
      closing_time: '22:00',
    });
    component.add_hour();
    expect(component.onChange.emit).toHaveBeenCalledWith(
      component.openings_form,
    );
  });

  it('should remove an hour from openings_form', () => {
    component.add_hour(); // Add first to ensure there is something to remove
    component.remove_hour(0);
    expect(component.openings_form.length).toBe(0);
  });

  it('should emit onChange event when hour is removed', () => {
    component.add_hour(); // Add first
    spyOn(component.onChange, 'emit');
    component.remove_hour(0);
    expect(component.onChange.emit).toHaveBeenCalledWith(
      component.openings_form,
    );
  });

  it('should filter weekdays based on input', () => {
    let result: Weekday[] | undefined;
    component.filtered_weekdays.subscribe((res) => (result = res));
    component.hour_form.controls['id_day'].setValue('Mon');
    expect(result).toBeDefined();
    expect(result!.length).toBe(1);
    expect(result![0].name).toContain('Monday');
  });
});
