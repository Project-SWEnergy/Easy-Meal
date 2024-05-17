import { AllergiesIngredient } from "../entities/allergies-ingredient.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data AllergiesIngredient[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultAllergiesIngredientDto {
    result: boolean;
    message: string;
    data: AllergiesIngredient[];
}