import { Dish } from "../entities/dish.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data Dish[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultDishesDto {
    result: boolean;
    message: string;
    data: Dish[];
}