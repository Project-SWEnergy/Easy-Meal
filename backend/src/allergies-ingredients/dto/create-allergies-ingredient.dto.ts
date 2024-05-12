import { IsInt, IsNotEmpty } from "class-validator";

/**
 * @param id_allergy number: id allergia
 * @param id_ingredient number: id ingrediente
 */
export class CreateAllergiesIngredientDto {
    @IsNotEmpty()
    @IsInt()
    id_allergy: number;

    @IsNotEmpty()
    @IsInt()
    id_ingredient: number;
}
