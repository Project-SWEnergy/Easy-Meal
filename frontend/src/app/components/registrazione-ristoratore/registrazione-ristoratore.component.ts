import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { RestaurantCreateFormComponent } from '../form/restaurant-create-form/restaurant-create-form.component';
import { AddressCreateFormComponent } from '../form/address-create-form/address-create-form.component';
import { ImageFormComponent } from '../form/image-form/image-form.component';
import { RestaurantRistoratoreService } from '../../services/ristoratore/restaurant.ristoratore.service';
import { RestaurantCreate } from '../../interfaces/restaurant';
import { OpeningHoursFormRistoratoreComponent } from '../form/opening-hours-form-ristoratore/opening-hours-form-ristoratore.component';

@Component({
  selector: 'app-registrazioneRistoratore',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RestaurantCreateFormComponent,
    AddressCreateFormComponent,
    ImageFormComponent,
    OpeningHoursFormRistoratoreComponent,
  ],
  templateUrl: './registrazione-ristoratore.component.html',
  styleUrl: './registrazione-ristoratore.component.css',
})
export class RegistrazioneRistoratoreComponent {
  constructor() { }

  router = inject(Router);
  restaurant_service = inject(RestaurantRistoratoreService);
  restaurant_form = new FormGroup({
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
      Validators.minLength(9),
      Validators.maxLength(13),
      Validators.required,
    ]),
  });

  address_form = new FormGroup({
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    street_number: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip_code: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9][0-9][0-9][0-9][0-9]'),
    ]),
  });

  logo: File | null = null;
  banner_image: File | null = null;
  openings_form = new FormArray<FormGroup>([]);

  is_valid(): boolean {
    return (
      this.restaurant_form.valid &&
      this.address_form.valid &&
      this.logo !== null &&
      this.banner_image !== null &&
      this.openings_form.valid
    );
  }

  on_submit() {
    if (!this.is_valid()) {
      return;
    }

    const restaurant_form = {
      createRestaurantDto: this.restaurant_form.value,
      createAddressDto: this.address_form.value,
      banner_image: this.banner_image!,
      logo: this.logo!,
    } as RestaurantCreate;

    const hours = this.openings_form.getRawValue().map((value) => {
      return {
        id_day: value['id_day'].id as number,
        opening_time: value['opening_time'] as string,
        closing_time: value['closing_time'] as string,
      };
    });

    this.restaurant_service.create(restaurant_form, hours).then((res) => {
      if (res) {
        this.router.navigate(['ristoratore/home']);
      }
    });
  }

  restaurant_on_change(form: FormGroup) {
    this.restaurant_form = form;
  }

  address_on_change(form: FormGroup) {
    this.address_form = form;
  }

  logo_on_change(img: File) {
    if (img) {
      this.logo = img;
    }
  }

  banner_image_on_change(img: File) {
    if (img) {
      this.banner_image = img;
    }
  }

  openings_on_change(openings: FormArray) {
    this.openings_form = openings;
  }
}
