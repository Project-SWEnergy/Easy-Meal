import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DishIngredient, Ingredient } from '../../../../interfaces/ingredient';
import { Dish } from '../../../../interfaces/dish';
import { IngredientRistoratoreService } from '../../../../services/ristoratore/ingredient.ristoratore.service';
import { OneSelectionService } from '../../../../services/ristoratore/ingredient-selection.ristoratore.service';
import { MatCardModule } from '@angular/material/card';
import { DishIngredientFormComponent } from '../../../form/dish-ingredient-form/dish-ingredient-form.component';
import { ObservableService } from '../../../../services/lib/observable.service';

@Component({
  selector: 'app-dish-ingredient-ristoratore',
  standalone: true,
  imports: [MatCardModule, DishIngredientFormComponent],
  templateUrl: './dish-ingredient-ristoratore.component.html',
  styleUrl: './dish-ingredient-ristoratore.component.css',
})
export class DishIngredientRistoratoreComponent {
  @Input() dish: Dish;
  @Input() ingredient: DishIngredient | null;
  @Input() ingredient_list_observable: ObservableService;

  @Output() onChanges = new EventEmitter<void>();

  ingredient_for_name: Ingredient;
  ingredient_service = inject(IngredientRistoratoreService);
  one_selection_service = inject(OneSelectionService);
  is_selected = false;

  ngOnInit(): void {
    if (this.ingredient) {
      this.ingredient_service
        .get_one(this.ingredient.id_ingredient)
        .then((res) => {
          this.ingredient_for_name = res;
        });
    }

    this.one_selection_service.subscribe(this);
  }

  ngOnDestroy(): void {
    this.one_selection_service.unsubscribe(this);
  }

  on_changes(): void {
    this.one_selection_service.deselect();
    this.onChanges.emit();
  }

  select() {
    if (this.ingredient) {
      this.one_selection_service.select(this.ingredient.id_ingredient);
    } else {
      this.one_selection_service.select(0);
    }
  }

  update() {
    if (this.ingredient) {
      this.is_selected =
        this.ingredient.id_ingredient === this.one_selection_service.selected();
    } else {
      this.is_selected = this.one_selection_service.selected() === 0;
    }
  }
}
