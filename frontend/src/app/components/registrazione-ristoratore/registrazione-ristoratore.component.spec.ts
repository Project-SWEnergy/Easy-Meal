import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormArray,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RegistrazioneRistoratoreComponent } from './registrazione-ristoratore.component';
import { RestaurantRistoratoreService } from '../../services/ristoratore/restaurant.ristoratore.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegistrazioneRistoratoreComponent', () => {
  let component: RegistrazioneRistoratoreComponent;
  let fixture: ComponentFixture<RegistrazioneRistoratoreComponent>;
  let restaurantService: jasmine.SpyObj<RestaurantRistoratoreService>;
  let router: Router;

  beforeEach(async () => {
    const restaurantServiceSpy = jasmine.createSpyObj(
      'RestaurantRistoratoreService',
      ['create']
    );

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RegistrazioneRistoratoreComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: RestaurantRistoratoreService,
          useValue: restaurantServiceSpy,
        },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrazioneRistoratoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    restaurantService = TestBed.inject(
      RestaurantRistoratoreService
    ) as jasmine.SpyObj<RestaurantRistoratoreService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid initial state for forms', () => {
    expect(component.restaurant_form.valid).toBeFalsy();
    expect(component.address_form.valid).toBeFalsy();
  });

  it('should validate the restaurant form correctly when fully populated', () => {
    component.restaurant_form.setValue({
      email: 'test@example.com',
      password: '123456',
      name: 'My Restaurant',
      owner_name: 'John',
      owner_surname: 'Doe',
      seats: 10,
      website: 'http://www.example.com',
      price_tier: 2,
      description: 'A nice place to eat.',
      phone: '12345678901',
    });
    expect(component.restaurant_form.valid).toBeTruthy();
  });

  it('should validate the address form correctly when fully populated', () => {
    component.address_form.setValue({
      city: 'Anytown',
      street: 'Main St',
      street_number: '123',
      state: 'Anystate',
      zip_code: '12345',
    });
    expect(component.address_form.valid).toBeTruthy();
  });

  it('should not submit if the form is invalid', () => {
    component.on_submit();
    expect(restaurantService.create).not.toHaveBeenCalled();
  });

  it('should submit when the form is valid and navigate on success', async () => {
    component.restaurant_form.setValue({
      email: 'test@example.com',
      password: '123456',
      name: 'My Restaurant',
      owner_name: 'John',
      owner_surname: 'Doe',
      seats: 10,
      website: 'http://www.example.com',
      price_tier: 2,
      description: 'A nice place to eat.',
      phone: '12345678901',
    });
    component.address_form.setValue({
      city: 'Anytown',
      street: 'Main St',
      street_number: '123',
      state: 'Anystate',
      zip_code: '12345',
    });
    component.logo = new File([], 'logo.png');
    component.banner_image = new File([], 'banner.png');
    component.openings_form.push(
      new FormGroup({
        id_day: new FormControl(1),
        opening_time: new FormControl('08:00'),
        closing_time: new FormControl('20:00'),
      }),
    );

    restaurantService.create.and.resolveTo(true);
    spyOn(router, 'navigate');

    await component.on_submit();
    expect(restaurantService.create).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['ristoratore/home']);
  });

  it('should handle create service returning false', async () => {
    component.restaurant_form.setValue({
      email: 'test@example.com',
      password: '123456',
      name: 'My Restaurant',
      owner_name: 'John',
      owner_surname: 'Doe',
      seats: 10,
      website: 'http://www.example.com',
      price_tier: 2,
      description: 'A nice place to eat.',
      phone: '12345678901',
    });
    component.address_form.setValue({
      city: 'Anytown',
      street: 'Main St',
      street_number: '123',
      state: 'Anystate',
      zip_code: '12345',
    });
    component.logo = new File([], 'logo.png');
    component.banner_image = new File([], 'banner.png');
    component.openings_form.push(
      new FormGroup({
        id_day: new FormControl(1),
        opening_time: new FormControl('08:00'),
        closing_time: new FormControl('20:00'),
      }),
    );

    restaurantService.create.and.resolveTo(false);

    await component.on_submit();
    expect(restaurantService.create).toHaveBeenCalled();
  });

  it('should handle create service throwing an error', async () => {
    component.restaurant_form.setValue({
      email: 'test@example.com',
      password: '123456',
      name: 'My Restaurant',
      owner_name: 'John',
      owner_surname: 'Doe',
      seats: 10,
      website: 'http://www.example.com',
      price_tier: 2,
      description: 'A nice place to eat.',
      phone: '12345678901',
    });
    component.address_form.setValue({
      city: 'Anytown',
      street: 'Main St',
      street_number: '123',
      state: 'Anystate',
      zip_code: '12345',
    });
    component.logo = new File([], 'logo.png');
    component.banner_image = new File([], 'banner.png');
    component.openings_form.push(
      new FormGroup({
        id_day: new FormControl(1),
        opening_time: new FormControl('08:00'),
        closing_time: new FormControl('20:00'),
      }),
    );

    restaurantService.create.and.returnValue(
      Promise.reject(new Error('Something went wrong'))
    );

    await component.on_submit();
    expect(restaurantService.create).toHaveBeenCalled();
  });

  it('should update restaurant_form when restaurant_on_change is called', () => {
    let newForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      owner_name: new FormControl('', Validators.required),
      owner_surname: new FormControl('', Validators.required),
      seats: new FormControl(0, [Validators.min(1), Validators.required]),
      website: new FormControl(''),
      price_tier: new FormControl(0, [
        Validators.min(0),
        Validators.max(3),
        Validators.required,
      ]),
      description: new FormControl('', Validators.maxLength(512)),
      phone: new FormControl('', [
        Validators.minLength(11),
        Validators.maxLength(13),
        Validators.required,
      ]),
    });

    newForm.setValue({
      email: 'test@example.com',
      password: '123456',
      name: 'My Restaurant',
      owner_name: 'John',
      owner_surname: 'Doe',
      seats: 10,
      website: 'http://www.example.com',
      price_tier: 2,
      description: 'A nice place to eat.',
      phone: '12345678901',
    });

    component.restaurant_on_change(newForm);
    expect(component.restaurant_form).toEqual(newForm);
  });

  it('should update address_form when address_on_change is called', () => {
    let newForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      street_number: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zip_code: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9][0-9][0-9][0-9][0-9]'),
      ]),
    });

    newForm.setValue({
      city: 'Anytown',
      street: 'Main St',
      street_number: '123',
      state: 'Anystate',
      zip_code: '12345',
    });

    component.address_on_change(newForm);
    expect(component.address_form).toEqual(newForm);
  });

  it('should update logo when logo_on_change is called with a valid image', () => {
    const newLogo = new File([''], 'logo.png');
    component.logo_on_change(newLogo);
    expect(component.logo).toEqual(newLogo);
  });

  it('should not update logo when logo_on_change is called with null', () => {
    component.logo = new File([''], 'initial_logo.png'); // setting initial logo
    component.logo_on_change(null as any); // simulating no file provided
    expect(component.logo.name).toBe('initial_logo.png'); // logo should not change
  });

  it('should update banner_image when banner_image_on_change is called with a valid image', () => {
    const newImage = new File([''], 'banner.png');
    component.banner_image_on_change(newImage);
    expect(component.banner_image).toEqual(newImage);
  });

  it('should not update banner_image when banner_image_on_change is called with null', () => {
    component.banner_image = new File([''], 'initial_banner.png'); // setting initial banner
    component.banner_image_on_change(null as any); // simulating no file provided
    expect(component.banner_image.name).toBe('initial_banner.png'); // banner should not change
  });

  it('should update openings_form when openings_on_change is called', () => {
    const newFormArray = new FormArray([
      new FormGroup({
        day: new FormControl('Monday'),
        open: new FormControl('08:00 AM'),
        close: new FormControl('05:00 PM'),
      }),
    ]);
    component.openings_on_change(newFormArray);
    expect(component.openings_form).toEqual(newFormArray);
  });

  it('should not submit if any form is invalid', async () => {
    // Set only restaurant_form as valid
    component.restaurant_form.setValue({
      email: 'test@example.com',
      password: '123456',
      name: 'My Restaurant',
      owner_name: 'John',
      owner_surname: 'Doe',
      seats: 10,
      website: 'http://www.example.com',
      price_tier: 2,
      description: 'A nice place to eat.',
      phone: '12345678901',
    });
    // Set address_form as invalid
    component.address_form.setValue({
      city: '',
      street: '',
      street_number: '',
      state: '',
      zip_code: '',
    });

    await component.on_submit();
    expect(restaurantService.create).not.toHaveBeenCalled();

    // Set address_form as valid
    component.address_form.setValue({
      city: 'Anytown',
      street: 'Main St',
      street_number: '123',
      state: 'Anystate',
      zip_code: '12345',
    });

    // Set openings_form as invalid
    component.openings_form.push(
      new FormGroup({
        id_day: new FormControl(1),
        opening_time: new FormControl('', Validators.required),
        closing_time: new FormControl('20:00', Validators.required),
      })
    );

    await component.on_submit();
    expect(restaurantService.create).not.toHaveBeenCalled();

    // Set openings_form as valid
    component.openings_form.clear();
    component.openings_form.push(
      new FormGroup({
        id_day: new FormControl(1),
        opening_time: new FormControl('08:00', Validators.required),
        closing_time: new FormControl('20:00', Validators.required),
      })
    );

    // Set logo as null
    component.logo = null;
    await component.on_submit();
    expect(restaurantService.create).not.toHaveBeenCalled();

    // Set logo as valid
    component.logo = new File([], 'logo.png');

    // Set banner_image as null
    component.banner_image = null;
    await component.on_submit();
    expect(restaurantService.create).not.toHaveBeenCalled();
  });
});