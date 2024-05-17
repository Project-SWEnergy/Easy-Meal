import { Restaurant } from "../entities/restaurant.entity";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Restaurant} data Restaurant[ ]: oggetti coinvolti nell'operazione.
 */

export class ResultRestaurantDto {
    result: boolean;
    message: string;
    data: Restaurant[];
}