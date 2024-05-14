import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-restaurant-create-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './restaurant-create-form.component.html',
  styleUrl: './restaurant-create-form.component.css',
})
export class RestaurantCreateFormComponent {
  hide_password = true;

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    ]),
    password: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    owner_name: new FormControl('', Validators.required),
    owner_surname: new FormControl('', Validators.required),
    // id_address: new FormControl(...) -> not needed, managed by the backend
    seats: new FormControl(0, [Validators.min(1), Validators.required]), //
    website: new FormControl(''),
    price_tier: new FormControl(0, [
      Validators.min(0),
      Validators.max(3),
      Validators.required,
    ]),
    description: new FormControl('', Validators.maxLength(255)),
    phone: new FormControl('', [
      Validators.minLength(11),
      Validators.maxLength(13),
      Validators.required,
    ]),
  });

  /** The parent need to check for the validity of the form */
  @Output() onChange = new EventEmitter<FormGroup>();

  // Whenever a change occurs in the formGroup,
  // than it is passed to the parent.
  // The parent component needs to check for the validity of the form
  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => {
      this.onChange.emit(this.form);
    });
  }
}
