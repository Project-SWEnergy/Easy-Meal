import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

/**
 * @param id_allergy number: id allergia
 * @param id_ingredient number: id ingrediente
 */
export class CreateAllergiesIngredientDto {
    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    id_allergy: number;

    @IsNotEmpty()
    @IsInt()
    @ApiProperty()
    id_ingredient: number;
}
