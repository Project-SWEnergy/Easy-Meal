import { IsNotEmpty, IsString } from "class-validator";
/**
 * @param city string: città
 * @param street string: via
 * @param street_number string: numero civico
 * @param state string: stato
 * @param zip_code string: codice postale
 * 
 */
export class CreateAddressDto {
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    street: string;

    @IsString()
    @IsNotEmpty()
    street_number: string;

    @IsString()
    @IsNotEmpty()
    state: string;
    
    @IsString()
    @IsNotEmpty()
    zip_code: string;
}
