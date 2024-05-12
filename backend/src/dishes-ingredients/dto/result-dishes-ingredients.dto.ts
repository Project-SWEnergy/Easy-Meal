import { DishesIngredient } from "../entities/dishes-ingredient.entity";
    
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data DishesIngredient[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultDishesIngredientDto {
    result: boolean;
    message: string;
    data: DishesIngredient[];
}