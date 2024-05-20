import { Restaurant } from "../entities/restaurant.entity";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param {Restaurant} data Restaurant[ ]: oggetti coinvolti nell'operazione.
 */

export class ResultRestaurantDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: Restaurant[];
}