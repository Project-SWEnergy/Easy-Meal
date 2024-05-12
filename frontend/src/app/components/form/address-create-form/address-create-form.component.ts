import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-address-create-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './address-create-form.component.html',
  styleUrl: './address-create-form.component.css',
})
export class AddressCreateFormComponent {
  form = new FormGroup({
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    street_number: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip_code: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9][0-9][0-9][0-9][0-9]'),
    ]),
  });

  /** The parent need to check for the validity of the form */
  @Output() onChange = new EventEmitter<FormGroup>();

  ngOnInit() {
    this.form.valueChanges.subscribe(() => this.onChange.emit(this.form));
  }
}
