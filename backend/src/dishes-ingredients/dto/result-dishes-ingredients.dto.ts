import { DishesIngredient } from "../entities/dishes-ingredient.entity";
import { ApiProperty } from "@nestjs/swagger";    
/**
 * @param result bool: risultato dell'operazione.
 * @param message string: messaggio di risposta.
 * @param data DishesIngredient[ ]: oggetti coinvolti nell'operazione.
 */
export class ResultDishesIngredientDto {
    @ApiProperty()
    result: boolean;
    @ApiProperty()
    message: string;
    @ApiProperty()
    data: DishesIngredient[];
}