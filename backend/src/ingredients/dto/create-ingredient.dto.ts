import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

/**
 * @param id_restaurant number: id ristorante
 * @param name string: nome ingrediente
 */
export class CreateIngredientDto {
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    id_restaurant: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    unit_of_measurement?: string
}
