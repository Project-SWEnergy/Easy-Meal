import { IsDecimal, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
    id_restaurant: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsDecimal()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsOptional()
    image: string;
}
