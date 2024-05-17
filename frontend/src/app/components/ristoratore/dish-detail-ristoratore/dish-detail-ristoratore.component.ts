import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from '../../../interfaces/dish';
import { DishRistoratoreService } from '../../../services/ristoratore/dish.ristoratore.service';
import { DishUpdateRistoratoreComponent } from './dish-update-ristoratore/dish-update-ristoratore.component';
import { DishIngredientRistoratoreComponent } from './dish-ingredient-ristoratore/dish-ingredient-ristoratore.component';
import { DishIngredientFormComponent } from '../../form/dish-ingredient-form/dish-ingredient-form.component';
import { DishIngredient } from '../../../interfaces/ingredient';
import { DishIngredientRistoratoreService } from '../../../services/ristoratore/dish-ingredient.ristoratore.service';
import { ObservableService } from '../../../services/lib/observable.service';
import { MessageService } from '../../../services/lib/message.service';

@Component({
  selector: 'app-dish-detail-ristoratore',
  standalone: true,
  imports: [
    DishUpdateRistoratoreComponent,
    DishIngredientRistoratoreComponent,
    DishIngredientFormComponent,
  ],
  templateUrl: './dish-detail-ristoratore.component.html',
  styleUrl: './dish-detail-ristoratore.component.css',
})
export class DishDetailRistoratoreComponent {
  dish: Dish;
  ingredients: DishIngredient[];
  ingredient_list_observable = inject(ObservableService);
  ms = inject(MessageService);
  router = inject(ActivatedRoute);
  router_service = inject(Router);
  dish_service = inject(DishRistoratoreService);
  dish_ingredient_service = inject(DishIngredientRistoratoreService);

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    if (!id) {
      this.ms.log('No dish id provided');
      return;
    }

    this.load_data(+id);
  }

  navigate_back() {
    this.router_service.navigate(['ristoratore/dishes']);
  }

  async load_data(dish_id: number): Promise<void> {
    this.dish = await this.dish_service.get(dish_id);
    this.dish_ingredient_service
      .ingredients_in_dish(this.dish.id)
      .then((res) => {
        this.ingredients = res;
      });
  }
}
