import { Component, Input } from '@angular/core';
import { IngredientiService } from '../../../services/home-generico/ingredienti.service';
import { Ingredient } from '../../../interfaces/ingredienti';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredienti-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ingredienti-list.component.html',
  styleUrl: './ingredienti-list.component.css',
})
export class IngredientiListComponent {
  @Input() dishId: number | undefined;
  ingredients: Ingredient[] = [];

  constructor(private ingredientiService: IngredientiService) {}

  ngOnInit(): void {
    if (this.dishId) {
      this.loadIngredients(this.dishId);
    }
  }

  async loadIngredients(dishId: number): Promise<void> {
    try {
      const ingredientIds: number[] =
        await this.ingredientiService.getIngredientsByDishId(dishId);
      const ingredients: Ingredient[] =
        await this.ingredientiService.getIngredientsById(ingredientIds);
      this.ingredients = ingredients;
    } catch (error) {
      console.error('Errore durante il caricamento degli ingredienti:', error);
    }
  }
}
