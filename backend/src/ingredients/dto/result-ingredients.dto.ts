import { Ingredient } from "../entities/ingredient.entity";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data Ingredient[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultIngredientDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: Ingredient[];
}