import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
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
    @ApiProperty()
    city: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    street: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    street_number: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    state: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    zip_code: string;
}
