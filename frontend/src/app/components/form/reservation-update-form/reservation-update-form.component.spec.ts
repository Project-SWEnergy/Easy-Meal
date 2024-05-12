import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReservationUpdateFormComponent } from './reservation-update-form.component';
import { ReservationRistoratoreService } from '../../../services/ristoratore/reservation.ristoratore.service';
import {
  BillSplittingMethod,
  ReservationState,
} from '../../../interfaces/reservation';
import { AuthService } from '../../../services/auth.service';

describe('ReservationUpdateFormComponent', () => {
  let component: ReservationUpdateFormComponent;
  let fixture: ComponentFixture<ReservationUpdateFormComponent>;

  const authServiceMock = {
    get: jasmine
      .createSpy('get')
      .and.returnValue({ id: 1, role: 'restaurant' }), // Ensure this matches expected structure
  };
  let mockReservationService: jasmine.SpyObj<ReservationRistoratoreService>;

  beforeEach(async () => {
    mockReservationService = jasmine.createSpyObj(
      'ReservationRistoratoreService',
      ['update'],
    );

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        NoopAnimationsModule,
        ReservationUpdateFormComponent,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        {
          provide: ReservationRistoratoreService,
          useValue: mockReservationService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservationUpdateFormComponent);
    component = fixture.componentInstance;

    // Input example
    component.reservation = {
      id: 1,
      id_restaurant: 123,
      date: '2021-12-31',
      partecipants: 2,
      reservation_state: ReservationState.InAttesa,
      bill_splitting_method: BillSplittingMethod.Equidiviso,
      paid_orders: 0,
    };

    fixture.detectChanges(); // triggers initial data binding and ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with input reservation data', () => {
    expect(component.form.get('partecipants')?.value).toBe(
      component.reservation.partecipants,
    );
    expect(component.form.get('reservation_state')?.value).toBe(
      component.reservation.reservation_state,
    );
    expect(component.form.get('bill_splitting_method')?.value).toBe(
      component.reservation.bill_splitting_method,
    );
  });

  it('should emit onChange event and reset selection on successful form submission', async () => {
    const validFormState = {
      partecipants: 3,
      reservation_state: ReservationState.Approvata,
      bill_splitting_method: BillSplittingMethod.Individuale,
    };

    component.form.setValue(validFormState);
    mockReservationService.update.and.returnValue(Promise.resolve(true));
    spyOn(component.onChange, 'emit');

    await component.send_form();

    expect(component.selected).toBeFalse();
    expect(component.onChange.emit).toHaveBeenCalled();
  });

  it('should not submit the form if it is invalid', () => {
    component.form.controls['reservation_state'].setValue('');
    expect(component.form.valid).toBeFalsy();

    component.send_form();

    expect(mockReservationService.update.calls.any()).toBeFalse();
  });
});
