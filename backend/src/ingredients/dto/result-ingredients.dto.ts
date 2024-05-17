import { Ingredient } from "../entities/ingredient.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data Ingredient[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultIngredientDto {
    result: boolean;
    message: string;
    data: Ingredient[];
}