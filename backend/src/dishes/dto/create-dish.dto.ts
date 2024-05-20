import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
/**
 * @param id_restaurant number: identificativo ristorante
 * @param name string: nome piatto
 * @param description string: descrizione piatto
 * @param price number: prezzo piatto
 * @param image string: URL immagine
 */
export class CreateDishDto {
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    id_restaurant: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @IsDecimal()
    @IsNotEmpty()
    @ApiProperty()
    price: number;

    @IsString()
    @IsOptional()
    @ApiProperty()
    image: string;
}
