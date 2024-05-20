import { Dish } from "../entities/dish.entity";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data Dish[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultDishesDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: Dish[];
}