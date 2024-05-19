import { OrderedDish } from "../entities/ordered-dish.entity";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data OrderedDish[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultOrderedDishDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: OrderedDish[];
}