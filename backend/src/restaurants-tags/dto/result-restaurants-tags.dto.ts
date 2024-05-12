
import { RestaurantsTag } from "../entities/restaurants-tag.entity";
/**
 * @param result bool : risultato dell' operazione
 * @param message string : messaggio di risposta
 * @param {RestaurantsTag} data RestaurantsTag[ ] : oggetto RestaurantsTag
 */

export class ResultRestaurantsTagsDto {
    result: boolean;
    message: string;
    data: RestaurantsTag[];
}


