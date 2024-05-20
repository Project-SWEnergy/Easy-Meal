import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id_restaurant number: id ristorante
 * @param name string: nome ingrediente
 */
export class CreateIngredientDto {
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    id_restaurant: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    unit_of_measurement?: string
}
