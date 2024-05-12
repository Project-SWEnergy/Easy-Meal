import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Ingredient, UnitOfMeasurement } from '../../../interfaces/ingredient';
import { IngredientRistoratoreService } from '../../../services/ristoratore/ingredient.ristoratore.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OneSelectionService } from '../../../services/ristoratore/ingredient-selection.ristoratore.service';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-ingredient-item',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormField,
    MatAutocompleteModule,
  ],
  templateUrl: './ingredient-item.component.html',
  styleUrl: './ingredient-item.component.css',
})
export class IngredientItemComponent {
  @Input() ingredient: Ingredient;
  @Output() onUpdate = new EventEmitter<void>();

  form: FormGroup;
  is_selected: boolean = false;

  units_of_measurement = Object.values(UnitOfMeasurement);

  ingredient_service = inject(IngredientRistoratoreService);
  one_select_service = inject(OneSelectionService);

  ngOnInit(): void {
    this.one_select_service.subscribe(this);

    // init of the form: it might need to have the values of the ingredient
    this.form = new FormGroup({
      name: new FormControl(this.ingredient.name ?? '', Validators.required),
      unit_of_measurement: new FormControl(
        this.ingredient.unit_of_measurement ?? '',
        Validators.required,
      ),
    });
  }

  ngOnDestroy(): void {
    this.one_select_service.unsubscribe(this);
  }

  update() {
    if (!this.form.valid) {
      return;
    }

    this.ingredient_service
      .update(this.ingredient.id, this.form.value)
      .then((res) => {
        if (res) {
          this.onUpdate.emit();
          this.one_select_service.deselect();
        } else {
          throw 'Something went wrong in the update of an ingredient';
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  select() {
    this.one_select_service.select(this.ingredient.id);
  }

  notify() {
    this.is_selected =
      this.ingredient.id === this.one_select_service.selected();
  }

  delete() {
    this.ingredient_service
      .delete(this.ingredient.id)
      .then((res) => {
        if (res) {
          this.onUpdate.emit();
        } else {
          throw 'something went wrong on the deletion of an ingredient';
        }
      })
      .catch((err) => {
        throw err;
      });
  }
}
