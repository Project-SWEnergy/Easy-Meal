import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DishIngredient, Ingredient } from '../../../interfaces/ingredient';
import { Dish } from '../../../interfaces/dish';
import { DishIngredientRistoratoreService } from '../../../services/ristoratore/dish-ingredient.ristoratore.service';
import { IngredientRistoratoreService } from '../../../services/ristoratore/ingredient.ristoratore.service';
import { ObservableService } from '../../../services/lib/observable.service';

@Component({
  selector: 'app-dish-ingredient-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './dish-ingredient-form.component.html',
  styleUrl: './dish-ingredient-form.component.css',
})
export class DishIngredientFormComponent {
  form: FormGroup;

  @Input() ingredient: DishIngredient | null;

  // this value is needed, bacause this form is used both
  // - to create
  // - to update
  // a dish ingredient;
  // in the former case, this is the (only) way to get the dish_id
  @Input() dish: Dish;

  // needed to notify that some ingredient has been added or removed
  @Input() ingredient_list_observable: ObservableService;

  @Output() onChanges = new EventEmitter<void>();

  ingredients: Ingredient[];
  filteredIngredients: Observable<Ingredient[]>;

  constructor(
    private dish_ingredient_service: DishIngredientRistoratoreService,
    private ingredient_service: IngredientRistoratoreService,
  ) {}

  async ngOnInit(): Promise<void> {
    let ingredient = null;

    // se riceve un ingrediente in input, carica le informazioni
    // relative a quell'ingrediente  per precompilare il form con
    // suddette informazioni
    // altrimenti si iscrive all'observable per ricevere
    // le notifiche di aggiornamento della lista di ingredienti
    if (this.ingredient) {
      ingredient = await this.ingredient_service.get_one(
        this.ingredient.id_ingredient,
      );
    } else {
      ingredient = '';
    }

    this.form = new FormGroup({
      name: new FormControl(
        { value: ingredient, disabled: ingredient === '' ? false : true },
        Validators.required,
      ),
      quantity: new FormControl(this.ingredient?.quantity, Validators.min(0)),
    });

    await this.update();
  }

  async update() {
    let ingredients = await this.dish_ingredient_service.get(this.dish.id);
    this.filteredIngredients = this.form.controls['name'].valueChanges.pipe(
      startWith(''),
      map((value: string | null | Ingredient) => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this._filter(name as string) : ingredients;
      }),
    );
    this.ingredients = ingredients;
  }

  displayFn(ing: Ingredient): string {
    return ing && ing.name ? ing.name : '';
  }

  private _filter(name: string): Ingredient[] {
    const filterValue = name.toLowerCase();

    return this.ingredients.filter((ing) => {
      return ing.name.toLowerCase().includes(filterValue);
    });
  }

  on_update() {
    if (!this.form.valid || !this.ingredient) {
      return;
    }

    this.dish_ingredient_service
      .update({
        id_dish: this.ingredient.id_dish,
        id_ingredient: this.ingredient.id_ingredient,
        quantity: this.form.value.quantity as number,
      })
      .then((res) => {
        if (res) {
          this.onChanges.emit();
        }
      });
  }

  async on_create() {
    if (!this.form.valid) {
      return;
    }

    const payload = {
      id_dish: this.dish.id,
      id_ingredient: this.form.value.name.id as number,
      quantity: this.form.value.quantity as number,
      units_of_measurement: this.form.value.units_of_measurement,
      name: this.form.value.name,
    };

    this.dish_ingredient_service.create(payload).then(async (res) => {
      if (res) {
        this.form.reset();
        this.ingredient_list_observable.notify();
        this.onChanges.emit();
      }
    });

    this.ingredients = await this.dish_ingredient_service.get(this.dish.id);
  }

  on_delete() {
    if (!this.ingredient) {
      return;
    }

    this.dish_ingredient_service.delete(this.ingredient).then((res) => {
      if (res) {
        this.ingredient_list_observable.notify();
        this.onChanges.emit();
      }
    });
  }
}
