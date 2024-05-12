import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RestaurantCreateFormComponent } from './restaurant-create-form.component';

describe('RestaurantCreateFormComponent', () => {
  let component: RestaurantCreateFormComponent;
  let fixture: ComponentFixture<RestaurantCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        NoopAnimationsModule,
        RestaurantCreateFormComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values and validators', () => {
    const form = component.form;
    expect(form).toBeTruthy();
    expect(form.get('email')?.errors?.['required']).toBeTruthy();
    expect(form.get('password')?.errors?.['required']).toBeTruthy();
    expect(form.get('name')?.errors?.['required']).toBeTruthy();
    expect(form.get('owner_name')?.errors?.['required']).toBeTruthy();
    expect(form.get('owner_surname')?.errors?.['required']).toBeTruthy();
    expect(form.get('seats')?.value).toBe(0);
    expect(form.get('seats')?.errors?.['min']).toBeTruthy();
    expect(form.get('price_tier')?.value).toBe(0);
    expect(form.get('phone')?.errors?.['required']).toBeTruthy();
  });

  it('should emit onChange event when form values change', () => {
    spyOn(component.onChange, 'emit');
    const emailInput = fixture.debugElement.query(
      By.css('input[formControlName="email"]'),
    );
    emailInput.nativeElement.value = 'test@example.com';
    emailInput.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.onChange.emit).toHaveBeenCalledWith(component.form);
  });

  it('should handle email format validation correctly', () => {
    const emailControl = component.form.get('email');
    emailControl?.setValue('badformat');
    expect(emailControl?.errors?.['pattern']).toBeTruthy();
    emailControl?.setValue('good@example.com');
    expect(emailControl?.errors).toBeNull();
  });
});
