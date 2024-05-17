import { OrderedDish } from "../entities/ordered-dish.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data OrderedDish[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultOrderedDishDto {
    result: boolean;
    message: string;
    data: OrderedDish[];
}