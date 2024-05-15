import { ApiProperty } from "@nestjs/swagger";
import { AllergiesIngredient } from "../entities/allergies-ingredient.entity";

/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data AllergiesIngredient[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultAllergiesIngredientDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: AllergiesIngredient[];
}