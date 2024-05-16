import { Component, Output, EventEmitter, inject } from '@angular/core';
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
import { DishRistoratoreService } from '../../../services/ristoratore/dish.ristoratore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dish-new-ristoratore',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
  ],
  templateUrl: './dish-new-ristoratore.component.html',
  styleUrl: './dish-new-ristoratore.component.css',
})
export class DishNewRistoratoreComponent {
  dish_service = inject(DishRistoratoreService);
  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [
      Validators.maxLength(255),
      Validators.required,
    ]),
    price: new FormControl(0, [Validators.min(0), Validators.required]),
    image: new FormControl('src', Validators.required),
  });

  file: File;
  uploaded_pic: string;

  constructor(private router: Router) {}

  @Output() onSubmit = new EventEmitter<FormGroup>();

  on_submit() {
    if (this.form.valid) {
      const form = {
        ...this.form.value,
        file: this.file,
      };

      this.dish_service
        .create(form)
        .then((dish) => {
          this.router.navigate(['ristoratore/dishes/' + dish.id]);
        })
        .catch((err) => {
          throw new Error('Error creating dish');
        });
    }
  }

  on_file_selected(event: any): void {
    this.file = event.target.files[0];
    this.form.get('image')?.updateValueAndValidity();

    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploaded_pic = e.target?.result as string;
      };
      reader.readAsDataURL(this.file);
    }
  }
}
