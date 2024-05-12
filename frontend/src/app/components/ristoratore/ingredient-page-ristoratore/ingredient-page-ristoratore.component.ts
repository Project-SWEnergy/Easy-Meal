import { Component, inject } from '@angular/core';
import { IngredientItemComponent } from '../../item/ingredient-item/ingredient-item.component';
import { Ingredient, UnitOfMeasurement } from '../../../interfaces/ingredient';
import { IngredientRistoratoreService } from '../../../services/ristoratore/ingredient.ristoratore.service';
import { MatCardModule } from '@angular/material/card';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-ingredient-page-ristoratore',
  standalone: true,
  imports: [
    IngredientItemComponent,
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormField,
    MatAutocompleteModule,
  ],
  templateUrl: './ingredient-page-ristoratore.component.html',
  styleUrl: './ingredient-page-ristoratore.component.css',
})
export class IngredientPageRistoratoreComponent {
  ingredients: Ingredient[];
  ingredient_service = inject(IngredientRistoratoreService);
  auth_service = inject(AuthService);
  router = inject(Router);
  units_of_measurement = Object.values(UnitOfMeasurement);

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    unit_of_measurement: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.load_ingredients();
  }

  async load_ingredients() {
    this.ingredients = await this.ingredient_service.get_all();
  }

  async new_ingredient() {
    if (!this.form.valid) {
      return;
    }

    this.ingredient_service
      .create(this.form.value as Ingredient)
      .then((res) => {
        if (res) {
          this.load_ingredients();
          this.form.reset();
        } else {
          throw 'Something went wrong on the creation of a new ingredient';
        }
      })
      .catch((err) => {
        throw err;
      });
  }
}
