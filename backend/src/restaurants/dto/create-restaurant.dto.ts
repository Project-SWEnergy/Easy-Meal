import { IsEmail, IsInt, IsNotEmpty, IsString, Max, Min, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
/**
 * @param email string: email del ristorante.
 * @param password string: password del ristorante.
 * @param name string: nome del ristorante.
 * @param owner_name string: nome del proprietario del ristorante.
 * @param owner_surname string: cognome del proprietario del ristorante.
 * @param id_address number: identificativo dell'indirizzo del ristorante.
 * @param seats number: numero di posti del ristorante.
 * @param website string: sito web del ristorante.
 * @param price_tier number: fascia di prezzo del ristorante.
 * @param description string: descrizione del ristorante.
 * @param phone string: numero di telefono del ristorante.
 * @param childre_seats number: numero di posti per bambini del ristorante.
 * @param accessibility boolean: accessibilità del ristorante.
 * @param logo? string: logo del ristorante.
 * @param banner_image string?: immagine di copertina del ristorante.
 */
export class CreateRestaurantDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty() 
    @ApiProperty()
    email: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    owner_name: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    owner_surname: string

    @IsInt()
    @IsOptional()
    @ApiProperty()
    id_address: number

    @IsInt()
    @Min(1)
    @IsNotEmpty()
    @ApiProperty()
    seats: number

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    website?: string

    @IsInt()
    @Min(1)
    @Max(3)
    @IsNotEmpty()
    @ApiProperty()
    price_tier: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    phone: string

    @ApiProperty({ required: false })
    @IsInt()
    @IsOptional()
    children_seats?: number

    @ApiProperty({ required: false })
    accessibility: boolean

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    logo?: string

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    banner_image?: string   
}
